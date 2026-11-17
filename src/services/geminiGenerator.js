import { GoogleGenAI } from '@google/genai';

let cachedClient = null;
let cachedApiKey = '';

function getGenAIClient(apiKey) {
  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new GoogleGenAI({ apiKey });
    cachedApiKey = apiKey;
  }
  return cachedClient;
}

const QUIZ_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    deckTitle: {
      type: 'string',
      description: 'Concise overall title for the study material (e.g. "Human Anatomy", "Macroeconomics", "JavaScript Fundamentals").'
    },
    questions: {
      type: 'array',
      description: 'List of multiple-choice revision flashcards generated from the study material.',
      items: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Section, chapter, or sub-topic name from the study material.'
          },
          concept: {
            type: 'string',
            description: 'Concise 2-6 word concept title tested by this card.'
          },
          question: {
            type: 'string',
            description: 'Clear, exam-style revision question based on the study material.'
          },
          answer: {
            type: 'string',
            description: 'Detailed, accurate explanation from the study material answering the question.'
          },
          options: {
            type: 'array',
            description: 'Exactly 4 distinct multiple-choice options (1 correct and 3 plausible distractors).',
            items: { type: 'string' }
          },
          correctIndex: {
            type: 'integer',
            description: '0-based index (0, 1, 2, or 3) of the correct option in the options array.'
          }
        },
        required: ['topic', 'concept', 'question', 'answer', 'options', 'correctIndex']
      }
    }
  },
  required: ['deckTitle', 'questions']
};

const WRITTEN_GRADE_SCHEMA = {
  type: 'object',
  properties: {
    score: {
      type: 'integer',
      description: 'Marks awarded from 0 to 10.'
    },
    verdict: {
      type: 'string',
      description: 'Short label: "Excellent!", "Good (Passed)", or "Needs Review".'
    },
    feedback: {
      type: 'string',
      description: '1 brief sentence on what the student got right or missed.'
    },
    missedPoints: {
      type: 'array',
      description: 'Up to 3 brief bullet points from the reference answer omitted by the student.',
      items: { type: 'string' }
    }
  },
  required: ['score', 'verdict', 'feedback', 'missedPoints']
};

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was', 'were',
  'have', 'has', 'had', 'not', 'but', 'what', 'which', 'who', 'whom', 'into',
  'they', 'their', 'them', 'there', 'been', 'being', 'also', 'such', 'can',
  'will', 'would', 'should', 'could', 'about', 'where', 'when', 'while', 'then',
  'than', 'some', 'more', 'most', 'other', 'only', 'very', 'just', 'like'
]);

/**
 * Computes an instant (<5ms) local grade by comparing key concepts and clauses
 * in the student's response against the reference study notes answer.
 */
export function computeInstantGrade({ referenceAnswer, userResponse }) {
  const trimmedUser = (userResponse || '').trim();
  const userLower = trimmedUser.toLowerCase();

  // Extract meaningful stems/keywords from reference answer
  const extractTerms = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w));

  const uniqueRefWords = [...new Set(extractTerms(referenceAnswer))];
  const matchedWords = uniqueRefWords.filter((w) => {
    const stem = w.length > 5 ? w.slice(0, -2) : w;
    return userLower.includes(stem);
  });

  // Split reference answer into key clauses/points to spot missed points immediately
  const clauses = referenceAnswer
    .split(/[.;•\n]+/)
    .map((c) => c.trim())
    .filter((c) => c.length > 12);

  const missedClauses = [];
  let matchedClauseCount = 0;

  clauses.forEach((clause) => {
    const clauseTerms = extractTerms(clause);
    if (clauseTerms.length === 0) return;
    const hits = clauseTerms.filter((w) => {
      const stem = w.length > 5 ? w.slice(0, -2) : w;
      return userLower.includes(stem);
    });
    if (hits.length / clauseTerms.length >= 0.35) {
      matchedClauseCount++;
    } else if (missedClauses.length < 3) {
      missedClauses.push(clause);
    }
  });

  const wordRatio =
    uniqueRefWords.length > 0 ? matchedWords.length / uniqueRefWords.length : 0.5;
  const clauseRatio =
    clauses.length > 0 ? matchedClauseCount / clauses.length : wordRatio;

  const combinedRatio = Math.max(wordRatio * 1.35, clauseRatio * 1.15);
  const score = Math.min(10, Math.max(1, Math.round(combinedRatio * 10)));
  const passed = score >= 6;

  return {
    score,
    passed,
    verdict:
      score >= 8
        ? 'Excellent!'
        : score >= 6
          ? 'Good (Passed)'
          : 'Needs Review',
    feedback:
      score >= 8
        ? 'Great recall — you captured the core points from the study notes.'
        : score >= 6
          ? 'Good effort! You got the main idea, with a few extra details to review below.'
          : 'You missed several key concepts from the notes. Review the breakdown below.',
    missedPoints: score >= 9 ? [] : missedClauses,
    userResponse: trimmedUser,
    isAiRefined: false
  };
}

/**
 * Generates 4-choice revision flashcards from any study notes or attached PDF document
 * using Gemini 4 Hydrogen and the Interactions API structured output schema.
 */
export async function generateQuestionsFromNotes({
  notesText = '',
  pdfDocument = null,
  topicName = '',
  count = 'comprehensive',
  apiKey
}) {
  const resolvedKey = (
    apiKey ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  ).trim();

  if (!resolvedKey) {
    throw new Error(
      'Missing Gemini API key. Please enter your Gemini API key or set VITE_GEMINI_API_KEY in .env.local.'
    );
  }

  const hasText = notesText && notesText.trim().length >= 20;
  const hasPdf = Boolean(pdfDocument && pdfDocument.base64Data);

  if (!hasText && !hasPdf) {
    throw new Error(
      'Please upload a PDF/Word/Text document or paste at least a couple of sentences of study material.'
    );
  }

  const client = getGenAIClient(resolvedKey);

  const isComprehensive = count === 'comprehensive' || Number(count) <= 0;
  const countInstruction = isComprehensive
    ? 'Generate a comprehensive set of 30 to 50 questions that thoroughly touches on EVERY section, sub-topic, definition, formula, process, comparison, and exam-worthy detail in the provided material.'
    : `Generate ${Number(count)} questions covering every major section, definition, process, comparison, and exam-worthy fact across the entire study material.`;

  const topicInstruction = topicName.trim()
    ? `Set "deckTitle" to "${topicName.trim()}", and group each question's "topic" field by its specific section or sub-topic within the material.`
    : 'Infer a clear "deckTitle" for the material, and assign a specific section/sub-topic name to each question\'s "topic" field.';

  const systemInstruction = [
    'You are an expert academic exam and revision tutor for QuizFlip.',
    'Convert any user-provided study document or notes (from any subject or field) into high-yield revision flashcards with 4 multiple-choice options each.',
    countInstruction,
    'Ensure questions span from the very beginning to the very end of the material so no area or sub-topic is skipped.',
    topicInstruction,
    'Every question MUST have:',
    '- Exactly 4 options in the "options" array (1 unambiguously correct option and 3 realistic, educational distractors).',
    '- "correctIndex" set to 0, 1, 2, or 3 matching the correct option.',
    '- Varying positions for "correctIndex" across questions (0, 1, 2, 3).',
    '- A comprehensive "answer" explanation summarizing the key takeaway from the material.'
  ].join('\n');

  const inputBlocks = [];
  if (hasPdf) {
    inputBlocks.push({
      type: 'document',
      data: pdfDocument.base64Data,
      mime_type: 'application/pdf'
    });
  }

  const promptLabel = isComprehensive
    ? 'Generate a comprehensive set of 30 to 50+ revision questions touching on every area'
    : `Generate ${Number(count)} revision questions touching on every area`;

  const promptText = hasText
    ? `${promptLabel} from the provided study material:\n\n${notesText.trim()}`
    : `${promptLabel} from the attached PDF study document (${pdfDocument.name}).`;

  inputBlocks.push({
    type: 'text',
    text: promptText
  });

  const interaction = await client.interactions.create({
    model: 'gemini-4-hydrogen',
    system_instruction: systemInstruction,
    input: hasPdf ? inputBlocks : promptText,
    store: false,
    generation_config: {
      thinking_level: 'low'
    },
    response_format: {
      type: 'text',
      mime_type: 'application/json',
      schema: QUIZ_RESPONSE_SCHEMA
    }
  });

  const rawJson = interaction.output_text;
  if (!rawJson) {
    throw new Error('Gemini returned an empty response. Please try again.');
  }

  const parsed = JSON.parse(rawJson);
  if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('Could not parse generated questions from the AI response.');
  }

  const baseId = Date.now();
  const deckTitle = (
    topicName.trim() ||
    parsed.deckTitle ||
    (pdfDocument ? pdfDocument.name.replace(/\.[^/.]+$/, '') : 'Custom Study Deck')
  ).trim();

  const questions = parsed.questions.map((item, idx) => {
    const rawOptions = Array.isArray(item.options) ? item.options.slice(0, 4) : [];
    while (rawOptions.length < 4) {
      rawOptions.push(`Option ${rawOptions.length + 1}`);
    }
    const safeCorrectIndex =
      typeof item.correctIndex === 'number' &&
      item.correctIndex >= 0 &&
      item.correctIndex < 4
        ? item.correctIndex
        : 0;

    return {
      id: baseId + idx,
      topic: (item.topic || deckTitle || 'General').trim(),
      concept: (item.concept || 'Key Concept').trim(),
      question: (item.question || '').trim(),
      answer: (item.answer || rawOptions[safeCorrectIndex]).trim(),
      options: rawOptions,
      correctIndex: safeCorrectIndex,
      isCustom: true
    };
  });

  return {
    deckTitle,
    questions
  };
}

/**
 * Ultra-fast AI grading using `gemini-3.5-flash-lite` with `thinking_level: "minimal"`
 * and `store: false` for sub-second response times.
 */
export async function gradeWrittenAnswer({
  question,
  referenceAnswer,
  userResponse
}) {
  const trimmedUser = (userResponse || '').trim();
  if (!trimmedUser) {
    throw new Error('Please write an answer before submitting.');
  }

  const savedCustomKey = localStorage.getItem('quizflip_gemini_api_key') || '';
  const resolvedKey = (
    savedCustomKey ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  ).trim();

  if (resolvedKey) {
    try {
      const client = getGenAIClient(resolvedKey);
      const interaction = await client.interactions.create({
        model: 'gemini-3.5-flash-lite',
        store: false,
        generation_config: {
          thinking_level: 'minimal'
        },
        system_instruction:
          'Grade the student answer from 0 to 10 against the Reference Answer based on meaning (6+ passes). Keep feedback to 1 brief sentence and list up to 3 short missed points.',
        input: `Q: ${question}\nReference: ${referenceAnswer}\nStudent: ${trimmedUser}`,
        response_format: {
          type: 'text',
          mime_type: 'application/json',
          schema: WRITTEN_GRADE_SCHEMA
        }
      });

      const parsed = JSON.parse(interaction.output_text || '{}');
      const score = Math.max(0, Math.min(10, Number(parsed.score) || 0));
      return {
        score,
        passed: score >= 6,
        verdict:
          parsed.verdict ||
          (score >= 8
            ? 'Excellent!'
            : score >= 6
              ? 'Good (Passed)'
              : 'Needs Review'),
        feedback:
          parsed.feedback ||
          'Compare your response with the reference study notes below.',
        missedPoints: Array.isArray(parsed.missedPoints)
          ? parsed.missedPoints
          : [],
        userResponse: trimmedUser,
        isAiRefined: true
      };
    } catch {
      // Fall back to instant grade if network/API fails
    }
  }

  return computeInstantGrade({ referenceAnswer, userResponse: trimmedUser });
}
