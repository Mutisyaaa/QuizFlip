import { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCw,
  BookOpen,
  Lightbulb
} from 'lucide-react';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Flashcard & Multiple-Choice Component
 * @param {Object} props
 * @param {Object} props.card - Current question object
 * @param {number} props.cardNumber - Current number (1-based)
 * @param {number} props.totalCards - Total cards in current filter
 * @param {number|undefined} props.selectedOption - Index selected by user for this card
 * @param {Function} props.onSelectOption - Callback (optionIndex, isCorrect) => void
 */
export function Flashcard({
  card,
  cardNumber,
  totalCards,
  selectedOption,
  onSelectOption
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const activeOptions = card.options;
  const activeCorrectIndex = card.correctIndex;

  const hasAnswered = selectedOption !== undefined;
  const isUserCorrect = hasAnswered && selectedOption === activeCorrectIndex;

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleChoiceClick = (index) => {
    if (hasAnswered) return;
    const correct = index === activeCorrectIndex;
    onSelectOption(index, correct);
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
                  Select one of the 4 choices below, or click card to flip
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

      {/* 4 Multiple-Choice Options Section */}
      <div className="choices-section" role="group" aria-label="Answer choices">
        <div className="choices-header">
          <span className="choices-label">Choose the correct Answer (1 of 4):</span>
          {!hasAnswered && (
            <span className="choices-shortcut-hint">Keys 1–4</span>
          )}
        </div>

        <div className="choices-grid">
          {activeOptions.map((optionText, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === activeCorrectIndex;

            let stateClass = '';
            if (hasAnswered) {
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
                disabled={hasAnswered}
                aria-pressed={isSelected}
              >
                <span className="choice-letter" aria-hidden="true">
                  {OPTION_LETTERS[index]}
                </span>
                <span className="choice-text">{optionText}</span>
                {hasAnswered && isCorrectOption && (
                  <CheckCircle2
                    size={20}
                    className="choice-status-icon correct-icon"
                    aria-hidden="true"
                  />
                )}
                {hasAnswered && isSelected && !isCorrectOption && (
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
          {hasAnswered && (
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
                      Not quite — Option {OPTION_LETTERS[activeCorrectIndex]} is the
                      correct answer.
                    </span>
                  </>
                )}
              </div>
              <p className="feedback-explanation">
                <Lightbulb size={15} className="inline-icon" aria-hidden="true" />
                <strong>Study Notes Explanation:</strong> {card.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
