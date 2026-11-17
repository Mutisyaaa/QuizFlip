import { GoogleGenAI } from '@google/genai';

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
      description: 'Marks awarded from 0 to 10 based on accuracy and completeness compared to the study notes.'
    },
    verdict: {
      type: 'string',
      description: 'Short label such as "Excellent!", "Good (Partially Correct)", or "Needs Review".'
    },
    feedback: {
      type: 'string',
      description: '1-2 sentences praising what the student got right or correcting any misconception.'
    },
    missedPoints: {
      type: 'array',
      description: 'Short bullet points from the study notes that the student omitted (empty array if score is 9 or 10).',
      items: { type: 'string' }
    }
  },
  required: ['score', 'verdict', 'feedback', 'missedPoints']
};

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

  const client = new GoogleGenAI({ apiKey: resolvedKey });

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
 * Grades a student's written short answer against the question and reference study notes
 * using Gemini 4 Hydrogen (with a local keyword fallback if offline).
 *
 * @param {Object} params
 * @param {string} params.question - The question prompt
 * @param {string} params.referenceAnswer - The official study note explanation
 * @param {string} params.userResponse - The student's typed answer
 * @returns {Promise<{ score: number, passed: boolean, verdict: string, feedback: string, missedPoints: string[], userResponse: string }>}
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
      const client = new GoogleGenAI({ apiKey: resolvedKey });
      const interaction = await client.interactions.create({
        model: 'gemini-4-hydrogen',
        system_instruction: [
          'You are a fair, encouraging university examiner grading a short-answer revision question.',
          'Compare the student\'s written response against the Reference Study Notes Answer.',
          'Award a score from 0 to 10 based on conceptual understanding (do not require word-for-word memorization if the meaning is right).',
          'If the student captured the core idea, award at least 6/10.',
          'List any important missing points from the Reference Study Notes in "missedPoints" (keep each bullet brief).'
        ].join('\n'),
        input: [
          `Question: ${question}`,
          `Reference Study Notes Answer: ${referenceAnswer}`,
          `Student's Written Answer: ${trimmedUser}`
        ].join('\n\n'),
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
        userResponse: trimmedUser
      };
    } catch {
      // Fall through to local keyword grading if network/API fails
    }
  }

  // Offline fallback: keyword overlap scoring
  const stopWords = new Set([
    'the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was', 'were',
    'have', 'has', 'had', 'not', 'but', 'what', 'which', 'who', 'whom', 'into',
    'they', 'their', 'them', 'there', 'been', 'being', 'also', 'such', 'can'
  ]);
  const refWords = referenceAnswer
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stopWords.has(w));
  const uniqueRefWords = [...new Set(refWords)];
  const userLower = trimmedUser.toLowerCase();
  const matched = uniqueRefWords.filter((w) => userLower.includes(w));
  const ratio =
    uniqueRefWords.length > 0 ? matched.length / uniqueRefWords.length : 0.5;
  const score = Math.min(10, Math.max(1, Math.round(ratio * 12)));

  return {
    score,
    passed: score >= 6,
    verdict:
      score >= 8 ? 'Strong Answer!' : score >= 6 ? 'Good Effort' : 'Needs Review',
    feedback:
      score >= 6
        ? 'You covered several key concepts from the study notes.'
        : 'Your answer missed several key terms from the study notes. Review the full explanation below.',
    missedPoints: [],
    userResponse: trimmedUser
  };
}
