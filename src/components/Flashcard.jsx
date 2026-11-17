import { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCw,
  BookOpen,
  Lightbulb,
  PenLine,
  Loader2,
  Sparkles
} from 'lucide-react';
import { gradeWrittenAnswer } from '../services/geminiGenerator';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Flashcard, 4-Choice, & Written Short-Answer Component
 * @param {Object} props
 * @param {Object} props.card - Current question object
 * @param {number} props.cardNumber - Current number (1-based)
 * @param {number} props.totalCards - Total cards in current filter
 * @param {'choices'|'written'} props.quizMode - 'choices' (4 options) or 'written' (short answer)
 * @param {Object|undefined} props.savedAnswer - { selectedIndex?, isCorrect, writtenResult? }
 * @param {Function} props.onSelectOption - Callback (optionIndex, isCorrect) => void
 * @param {Function} props.onWrittenGraded - Callback (gradeResult) => void
 */
export function Flashcard({
  card,
  cardNumber,
  totalCards,
  quizMode = 'choices',
  savedAnswer,
  onSelectOption,
  onWrittenGraded
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [writtenText, setWrittenText] = useState(
    () => savedAnswer?.writtenResult?.userResponse || ''
  );
  const [isGrading, setIsGrading] = useState(false);

  const activeOptions = card.options;
  const activeCorrectIndex = card.correctIndex;

  const selectedOption = savedAnswer?.selectedIndex;
  const writtenResult = savedAnswer?.writtenResult;

  const hasAnsweredChoices = selectedOption !== undefined;
  const hasAnsweredWritten = Boolean(writtenResult);
  const isUserCorrect =
    hasAnsweredChoices && selectedOption === activeCorrectIndex;

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleChoiceClick = (index) => {
    if (hasAnsweredChoices) return;
    const correct = index === activeCorrectIndex;
    onSelectOption(index, correct);
  };

  const handleWrittenSubmit = async (e) => {
    if (e) e.preventDefault();
    if (hasAnsweredWritten || isGrading || !writtenText.trim()) return;

    setIsGrading(true);
    try {
      const result = await gradeWrittenAnswer({
        question: card.question,
        referenceAnswer: card.answer,
        userResponse: writtenText
      });
      onWrittenGraded(result);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="flashcard-quiz-Stack">
      {/* Flashcard (<article> card root with native <button> for flipping) */}
      <article
        className="card-container"
        aria-label={`Revision card ${cardNumber} of ${totalCards}`}
      >
        <button
          type="button"
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          aria-pressed={isFlipped}
        >
          <div className="card-header">
            <div className="card-badges">
              <span className="badge">
                Card {cardNumber} of {totalCards}
              </span>
              <span className="badge topic-badge">
                <BookOpen size={12} aria-hidden="true" />
                {card.topic}
              </span>
            </div>
            <span className="hint">
              <RotateCw size={14} className="spin-icon" aria-hidden="true" />
              {isFlipped ? 'Show question' : 'Flip for notes'}
            </span>
          </div>

          <div className="card-body">
            {!isFlipped ? (
              <div className="card-content question-side">
                <div className="icon-wrapper question-icon" aria-hidden="true">
                  <HelpCircle size={26} />
                </div>
                <span className="mode-tag">{card.concept}</span>
                <h2 className="card-title">{card.question}</h2>
                <p className="card-subtext">
                  {quizMode === 'written'
                    ? 'Write your short answer below, or click card to flip'
                    : 'Select one of the 4 choices below, or click card to flip'}
                </p>
              </div>
            ) : (
              <div className="card-content answer-side">
                <div className="icon-wrapper answer-icon" aria-hidden="true">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="answer-heading">Study Notes Answer:</h3>
                <p className="answer-text">{card.answer}</p>
                <span className="concept-chip">{card.concept}</span>
              </div>
            )}
          </div>
        </button>
      </article>

      {quizMode === 'choices' ? (
        /* 4 Multiple-Choice Options Section */
        <div className="choices-section" role="group" aria-label="Answer choices">
          <div className="choices-header">
            <span className="choices-label">
              Choose the correct Answer (1 of 4):
            </span>
            {!hasAnsweredChoices && (
              <span className="choices-shortcut-hint">Keys 1–4</span>
            )}
          </div>

          <div className="choices-grid">
            {activeOptions.map((optionText, index) => {
              const isSelected = selectedOption === index;
              const isCorrectOption = index === activeCorrectIndex;

              let stateClass = '';
              if (hasAnsweredChoices) {
                if (isCorrectOption) {
                  stateClass = 'choice-correct';
                } else if (isSelected && !isCorrectOption) {
                  stateClass = 'choice-wrong';
                } else {
                  stateClass = 'choice-dimmed';
                }
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={`choice-btn ${stateClass}`}
                  onClick={() => handleChoiceClick(index)}
                  disabled={hasAnsweredChoices}
                  aria-pressed={isSelected}
                >
                  <span className="choice-letter" aria-hidden="true">
                    {OPTION_LETTERS[index]}
                  </span>
                  <span className="choice-text">{optionText}</span>
                  {hasAnsweredChoices && isCorrectOption && (
                    <CheckCircle2
                      size={20}
                      className="choice-status-icon correct-icon"
                      aria-hidden="true"
                    />
                  )}
                  {hasAnsweredChoices && isSelected && !isCorrectOption && (
                    <XCircle
                      size={20}
                      className="choice-status-icon wrong-icon"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Feedback & Revision Note Box after selecting a choice */}
          <div aria-live="polite">
            {hasAnsweredChoices && (
              <div
                className={`feedback-banner ${
                  isUserCorrect ? 'feedback-success' : 'feedback-error'
                }`}
              >
                <div className="feedback-title">
                  {isUserCorrect ? (
                    <>
                      <CheckCircle2 size={18} aria-hidden="true" />
                      <span>Correct! Well done.</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} aria-hidden="true" />
                      <span>
                        Not quite — Option {OPTION_LETTERS[activeCorrectIndex]} is
                        the correct answer.
                      </span>
                    </>
                  )}
                </div>
                <p className="feedback-explanation">
                  <Lightbulb
                    size={15}
                    className="inline-icon"
                    aria-hidden="true"
                  />
                  <strong>Study Notes Explanation:</strong> {card.answer}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Written Short-Answer Mode Section */
        <div className="written-section">
          <form className="written-form" onSubmit={handleWrittenSubmit}>
            <div className="choices-header">
              <label htmlFor="written-answer-input" className="choices-label">
                <PenLine
                  size={14}
                  className="inline-pen-icon"
                  aria-hidden="true"
                />
                Write your short answer in your own words:
              </label>
              {!hasAnsweredWritten && (
                <span id="written-shortcut-hint" className="choices-shortcut-hint">
                  Ctrl + Enter to grade
                </span>
              )}
            </div>

            <textarea
              id="written-answer-input"
              className="written-textarea"
              rows={3}
              aria-describedby="written-shortcut-hint"
              placeholder="Type your answer here... Gemini AI will grade it out of 10 and highlight any missing points."
              value={writtenText}
              onChange={(e) => setWrittenText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  handleWrittenSubmit(e);
                }
              }}
              disabled={hasAnsweredWritten || isGrading}
            />

            {!hasAnsweredWritten && (
              <div className="written-actions">
                <button
                  type="submit"
                  className="nav-btn primary grade-answer-btn"
                  disabled={isGrading || !writtenText.trim()}
                >
                  {isGrading ? (
                    <>
                      <Loader2
                        size={16}
                        className="spin-loader"
                        aria-hidden="true"
                      />
                      Grading with Gemini AI...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} aria-hidden="true" />
                      Grade My Answer
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          {/* AI Examiner Grading Feedback */}
          <div aria-live="polite">
            {writtenResult && (
              <div
                className={`feedback-banner ${
                  writtenResult.passed ? 'feedback-success' : 'feedback-error'
                }`}
              >
                <div className="written-grade-header">
                  <div className="feedback-title">
                    {writtenResult.passed ? (
                      <CheckCircle2 size={18} aria-hidden="true" />
                    ) : (
                      <XCircle size={18} aria-hidden="true" />
                    )}
                    <span>{writtenResult.verdict}</span>
                  </div>
                  <span className="written-score-pill">
                    Score: {writtenResult.score} / 10
                  </span>
                </div>

                <p className="written-feedback-text">{writtenResult.feedback}</p>

                {writtenResult.missedPoints &&
                  writtenResult.missedPoints.length > 0 && (
                    <div className="missed-points-box">
                      <strong>Key Points to Add Next Time:</strong>
                      <ul>
                        {writtenResult.missedPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                <p className="feedback-explanation">
                  <Lightbulb
                    size={15}
                    className="inline-icon"
                    aria-hidden="true"
                  />
                  <strong>Reference Study Notes:</strong> {card.answer}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
