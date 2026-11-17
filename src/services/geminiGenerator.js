import { GoogleGenAI } from '@google/genai';

const QUIZ_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      description: 'List of multiple-choice revision flashcards generated from the study notes.',
      items: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Short topic or chapter title, e.g. "Topic: Marketing Mix" or user-provided topic.'
          },
          concept: {
            type: 'string',
            description: 'Concise 2-6 word concept title tested by this card.'
          },
          question: {
            type: 'string',
            description: 'Clear, exam-style revision question based on the study notes.'
          },
          answer: {
            type: 'string',
            description: 'Detailed, accurate study-note explanation answering the question.'
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
  required: ['questions']
};

/**
 * Generates 4-choice revision flashcards from raw study notes and/or an attached PDF document
 * using Gemini 4 Hydrogen and the Interactions API structured output schema.
 *
 * @param {Object} params
 * @param {string} [params.notesText] - Raw study notes pasted or extracted from .docx/.txt
 * @param {{ name: string, base64Data: string } | null} [params.pdfDocument] - Optional PDF document
 * @param {string} [params.topicName] - Optional topic label for the generated cards
 * @param {number|string} [params.count='comprehensive'] - Number of questions or 'comprehensive'
 * @param {string} [params.apiKey] - Gemini API key
 * @returns {Promise<Array>} Array of validated question objects
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
      'Please upload a PDF/Word document or paste at least a couple of sentences of study notes.'
    );
  }

  const client = new GoogleGenAI({ apiKey: resolvedKey });

  const isComprehensive = count === 'comprehensive' || Number(count) <= 0;
  const countInstruction = isComprehensive
    ? 'Generate a comprehensive set of 30 to 50 questions that thoroughly touches on EVERY topic, sub-topic, definition, principle, step, advantage, disadvantage, and exam-worthy detail in the provided study material.'
    : `Generate ${Number(count)} questions covering every major section, definition, principle, step, comparison, and exam-worthy fact across the entire study material.`;

  const topicInstruction = topicName.trim()
    ? `Use "${topicName.trim()}" as the "topic" field for every generated question.`
    : 'Assign a clear, concise "topic" name (e.g. "Topic 1: <Subject>") based on each section or chapter of the notes/document.';

  const systemInstruction = [
    'You are an expert university exam and revision tutor for QuizFlip.',
    'Convert the user-provided study document and/or notes into high-yield revision flashcards with 4 multiple-choice options each.',
    countInstruction,
    'Ensure questions span from the very beginning to the very end of the notes so no area or sub-topic is skipped.',
    topicInstruction,
    'Every question MUST have:',
    '- Exactly 4 options in the "options" array (1 unambiguously correct option and 3 realistic, educational distractors).',
    '- "correctIndex" set to 0, 1, 2, or 3 matching the correct option.',
    '- Varying positions for "correctIndex" across questions (0, 1, 2, 3).',
    '- A comprehensive "answer" explanation summarizing the key study points from the notes.'
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
    ? `${promptLabel} from the attached/provided study material:\n\n${notesText.trim()}`
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
  return parsed.questions.map((item, idx) => {
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
      topic: (topicName.trim() || item.topic || 'Custom Study Notes').trim(),
      concept: (item.concept || 'Key Concept').trim(),
      question: (item.question || '').trim(),
      answer: (item.answer || rawOptions[safeCorrectIndex]).trim(),
      options: rawOptions,
      correctIndex: safeCorrectIndex,
      isCustom: true
    };
  });
}
