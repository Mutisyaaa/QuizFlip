import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { quizQuestions, quizTopics } from './data/questions';
import { Flashcard } from './components/Flashcard';
import { NotesGeneratorModal } from './components/NotesGeneratorModal';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  GraduationCap,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  Search,
  Flame,
  Sparkles,
  ListOrdered
} from 'lucide-react';
import './App.css';

const CUSTOM_QUESTIONS_STORAGE_KEY = 'quizflip_custom_questions';

/**
 * Seeded pseudo-random generator (Mulberry32) so shuffles are 100% pure inside useMemo
 * and produce a fresh random sequence whenever `seed` changes.
 */
function createSeededRandom(seed) {
  let t = seed >>> 0;
  return function nextRandom() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffles an array using Fisher-Yates and a seeded PRNG, and also shuffles each
 * question's 4 options so the correct choice is randomly distributed across A, B, C, and D.
 */
function shuffleDeckAndOptions(questions, seed, shouldShuffleOrder = true) {
  const rng = createSeededRandom(seed);

  // Shuffle the 4 options inside each question while keeping track of the right answer
  const cardsWithShuffledOptions = questions.map((q) => {
    const indices = [0, 1, 2, 3];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const newOptions = indices.map((origIdx) => q.options[origIdx]);
    const newCorrectIndex = indices.indexOf(q.correctIndex);
    return {
      ...q,
      options: newOptions,
      correctIndex: newCorrectIndex
    };
  });

  if (!shouldShuffleOrder) {
    return cardsWithShuffledOptions;
  }

  const deck = [...cardsWithShuffledOptions];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function App() {
  const dialogRef = useRef(null);

  // Custom AI-generated questions persisted in localStorage
  const [customQuestions, setCustomQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_QUESTIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combined question bank (Custom AI cards + all 90 BBM 122 cards)
  const allQuestions = useMemo(
    () => [...customQuestions, ...quizQuestions],
    [customQuestions]
  );

  // Dynamic topic list including any custom AI-generated topics
  const allTopics = useMemo(() => {
    const customTopicSet = new Set(customQuestions.map((q) => q.topic));
    const uniqueCustomTopics = [...customTopicSet].filter(
      (t) => !quizTopics.includes(t)
    );
    return ['All Topics', ...uniqueCustomTopics, ...quizTopics.slice(1)];
  }, [customQuestions]);

  // Filters & Shuffle State (Shuffled in a random sequence by default!)
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [isShuffled, setIsShuffled] = useState(true);
  const [shuffleSeed, setShuffleSeed] = useState(() =>
    Math.floor(Math.random() * 1000000) + 1
  );
  const [showMissedOnly, setShowMissedOnly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers dictionary: { [cardId]: { selectedIndex: number, isCorrect: boolean } }
  const [userAnswers, setUserAnswers] = useState({});
  const [streak, setStreak] = useState(0);

  // Build filtered & randomly shuffled deck
  const activeDeck = useMemo(() => {
    const filtered = allQuestions.filter((q) => {
      const matchesTopic =
        selectedTopic === 'All Topics' || q.topic === selectedTopic;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.concept.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query);
      const matchesMissed =
        !showMissedOnly ||
        (userAnswers[q.id] && !userAnswers[q.id].isCorrect);
      return matchesTopic && matchesSearch && matchesMissed;
    });

    return shuffleDeckAndOptions(filtered, shuffleSeed, isShuffled);
  }, [
    allQuestions,
    selectedTopic,
    searchQuery,
    showMissedOnly,
    isShuffled,
    shuffleSeed,
    userAnswers
  ]);

  const totalCards = activeDeck.length;
  const safeIndex = totalCards > 0 ? Math.min(currentIndex, totalCards - 1) : 0;
  const currentCard = activeDeck[safeIndex] || null;

  const isFirstCard = safeIndex === 0;
  const isLastCard = safeIndex >= totalCards - 1;
  const progressPercent =
    totalCards > 0 ? Math.round(((safeIndex + 1) / totalCards) * 100) : 0;

  // Score calculations
  const answeredIds = Object.keys(userAnswers);
  const totalAnswered = answeredIds.length;
  const totalCorrect = answeredIds.filter((id) => userAnswers[id].isCorrect).length;
  const totalMissed = totalAnswered - totalCorrect;
  const accuracyPercent =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Handlers
  const handleNext = useCallback(() => {
    if (!isLastCard) {
      setCurrentIndex((prev) => Math.min(prev + 1, totalCards - 1));
    }
  }, [isLastCard, totalCards]);

  const handlePrev = useCallback(() => {
    if (!isFirstCard) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [isFirstCard]);

  const handleSelectOption = useCallback(
    (optionIndex, isCorrect) => {
      if (!currentCard) return;
      setUserAnswers((prev) => ({
        ...prev,
        [currentCard.id]: { selectedIndex: optionIndex, isCorrect }
      }));
      setStreak((prev) => (isCorrect ? prev + 1 : 0));
    },
    [currentCard]
  );

  const handleReshuffle = () => {
    setIsShuffled(true);
    setShuffleSeed((prev) => prev + Math.floor(Math.random() * 10000) + 1);
    setUserAnswers({});
    setStreak(0);
    setShowMissedOnly(false);
    setCurrentIndex(0);
  };

  const handleOpenAiModal = () => {
    dialogRef.current?.showModal();
  };

  const handleQuestionsGenerated = (newQuestions, targetTopic) => {
    setCustomQuestions((prev) => {
      const updated = [...newQuestions, ...prev];
      try {
        localStorage.setItem(CUSTOM_QUESTIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });
    setSelectedTopic(targetTopic || 'All Topics');
    setSearchQuery('');
    setShowMissedOnly(false);
    setIsShuffled(true);
    setShuffleSeed((prev) => prev + Math.floor(Math.random() * 10000) + 1);
    setCurrentIndex(0);
  };

  const handleClearCustomCards = () => {
    setCustomQuestions([]);
    localStorage.removeItem(CUSTOM_QUESTIONS_STORAGE_KEY);
    setSelectedTopic('All Topics');
    setCurrentIndex(0);
    dialogRef.current?.close();
  };

  // Keyboard shortcuts for fast revision (1-4 for options, Left/Right arrows for navigation)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        dialogRef.current?.open ||
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'SELECT' ||
        e.target.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (['1', '2', '3', '4'].includes(e.key) && currentCard) {
        const idx = Number(e.key) - 1;
        if (userAnswers[currentCard.id] === undefined) {
          handleSelectOption(idx, idx === currentCard.correctIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, userAnswers, handleNext, handlePrev, handleSelectOption]);

  return (
    <div className="app-shell">
      {/* Top Banner / Header */}
      <header className="app-header">
        <div className="header-top-bar">
          <div className="badge-pill">
            <GraduationCap size={16} aria-hidden="true" /> QuizFlip • Study &amp; Revision
          </div>
          <button
            type="button"
            className="ai-add-notes-btn"
            onClick={handleOpenAiModal}
          >
            <Sparkles size={15} aria-hidden="true" />
            + AI Add Your Notes
          </button>
        </div>
        <h1>QuizFlip</h1>
        <p className="subtitle">
          {allQuestions.length} comprehensive 4-choice flashcards across every
          topic — shuffled in random order for active recall.
        </p>
      </header>

      {/* Score & Study Stats Bar */}
      <section className="stats-bar" aria-label="Study session statistics">
        <div className="stat-item">
          <span className="stat-label">Answered</span>
          <span className="stat-value">
            {totalAnswered} / {allQuestions.length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Correct</span>
          <span className="stat-value stat-emerald">
            <CheckCircle2 size={15} aria-hidden="true" />
            {totalCorrect}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value stat-cyan">{accuracyPercent}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Streak</span>
          <span className="stat-value stat-amber">
            <Flame size={15} aria-hidden="true" />
            {streak}
          </span>
        </div>
      </section>

      {/* Toolbar: Topic Filter, Search, & Shuffle Controls */}
      <section className="revision-toolbar" aria-label="Revision controls and filters">
        <div className="toolbar-row">
          <div className="filter-group">
            <label htmlFor="topic-select" className="visually-hidden">
              Filter by Course Topic
            </label>
            <select
              id="topic-select"
              className="topic-select"
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentIndex(0);
              }}
            >
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="search-group">
            <Search size={15} className="search-icon" aria-hidden="true" />
            <label htmlFor="concept-search" className="visually-hidden">
              Search notes or concepts
            </label>
            <input
              id="concept-search"
              type="search"
              className="search-input"
              placeholder="Search any topic (e.g. Mintzberg, Fayol, MBO)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
            />
          </div>
        </div>

        <div className="toolbar-toggles">
          <button
            type="button"
            className="toggle-chip active"
            onClick={handleReshuffle}
          >
            <Shuffle size={14} aria-hidden="true" />
            Reshuffle Random Order
          </button>

          <button
            type="button"
            className={`toggle-chip ${!isShuffled ? 'active' : ''}`}
            onClick={() => {
              setIsShuffled((prev) => !prev);
              setCurrentIndex(0);
            }}
            aria-pressed={!isShuffled}
          >
            <ListOrdered size={14} aria-hidden="true" />
            {isShuffled ? 'Switch to Topic Order' : 'In Topic Order'}
          </button>

          {totalMissed > 0 && (
            <button
              type="button"
              className={`toggle-chip missed-chip ${showMissedOnly ? 'active' : ''}`}
              onClick={() => {
                setShowMissedOnly((prev) => !prev);
                setCurrentIndex(0);
              }}
              aria-pressed={showMissedOnly}
            >
              <AlertCircle size={14} aria-hidden="true" />
              Review Missed ({totalMissed})
            </button>
          )}
        </div>
      </section>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-info">
          <span>
            Deck Progress ({totalCards > 0 ? safeIndex + 1 : 0} of {totalCards})
          </span>
          <span className="progress-value">{progressPercent}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Flashcard & 4 Choices Component */}
      <main className="quiz-main">
        {currentCard ? (
          <>
            <Flashcard
              key={`${currentCard.id}-${shuffleSeed}`}
              card={currentCard}
              cardNumber={safeIndex + 1}
              totalCards={totalCards}
              selectedOption={userAnswers[currentCard.id]?.selectedIndex}
              onSelectOption={handleSelectOption}
            />

            {/* Navigation Controls */}
            <div className="controls">
              <button
                type="button"
                className="nav-btn"
                onClick={handlePrev}
                disabled={isFirstCard}
              >
                <ChevronLeft size={18} aria-hidden="true" />
                Previous
              </button>

              <button
                type="button"
                className="restart-btn"
                onClick={handleReshuffle}
              >
                <RotateCcw size={16} aria-hidden="true" />
                Reset &amp; Reshuffle
              </button>

              <button
                type="button"
                className="nav-btn primary"
                onClick={handleNext}
                disabled={isLastCard}
              >
                Next
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-deck">
            <p>No revision cards match your current filter.</p>
            <button
              type="button"
              className="nav-btn primary"
              onClick={() => {
                setSelectedTopic('All Topics');
                setSearchQuery('');
                setShowMissedOnly(false);
                setCurrentIndex(0);
              }}
            >
              Show All {allQuestions.length} Cards
            </button>
          </div>
        )}
      </main>

      {/* Native <dialog> Modal for Gemini AI Notes Generation */}
      <NotesGeneratorModal
        dialogRef={dialogRef}
        onQuestionsGenerated={handleQuestionsGenerated}
        customCount={customQuestions.length}
        onClearCustomCards={handleClearCustomCards}
      />

      {/* Study Tips Footer */}
      <footer className="concept-callout">
        <h4>💡 QuizFlip Features &amp; Shortcuts:</h4>
        <ul>
          <li>
            <strong>Full Course Coverage (90+ Cards Shuffled):</strong> Covers
            every sub-topic across all 14 weeks of BBM 122 in a randomized
            sequence (both card order and A/B/C/D option order are shuffled).
          </li>
          <li>
            <strong>AI Notes Generator (30–60+ Questions):</strong> Click{' '}
            <code>+ AI Add Your Notes</code> to upload a <code>.pdf</code>, Word (
            <code>.docx</code>), or <code>.txt</code> file and generate a full
            shuffled question bank touching on every section of your document.
          </li>
          <li>
            <strong>4-Choice Quiz + Flashcard:</strong> Pick an option (or press keys{' '}
            <code>1</code>–<code>4</code>) for instant grading, or click the card to
            flip and read the full study notes.
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
