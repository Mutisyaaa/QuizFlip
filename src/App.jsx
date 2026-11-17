import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { quizQuestions as sampleQuestions } from './data/questions';
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
  ListOrdered,
  Upload,
  FolderOpen,
  Trash2,
  BookOpen
} from 'lucide-react';
import './App.css';

const SAVED_DECKS_STORAGE_KEY = 'quizflip_saved_decks';
const LEGACY_CUSTOM_QUESTIONS_KEY = 'quizflip_custom_questions';

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

function loadInitialDecks() {
  try {
    const savedRaw = localStorage.getItem(SAVED_DECKS_STORAGE_KEY);
    if (savedRaw) {
      const parsed = JSON.parse(savedRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Migrate legacy custom questions if present
    const legacyRaw = localStorage.getItem(LEGACY_CUSTOM_QUESTIONS_KEY);
    if (legacyRaw) {
      const legacyQuestions = JSON.parse(legacyRaw);
      if (Array.isArray(legacyQuestions) && legacyQuestions.length > 0) {
        const migrated = [
          {
            id: 'deck-migrated',
            title: legacyQuestions[0]?.topic || 'My Study Notes',
            questions: legacyQuestions
          }
        ];
        localStorage.setItem(SAVED_DECKS_STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return [];
}

function App() {
  const dialogRef = useRef(null);

  // User's uploaded/generated study decks
  const [savedDecks, setSavedDecks] = useState(loadInitialDecks);
  const [activeDeckId, setActiveDeckId] = useState(() => {
    const initial = loadInitialDecks();
    return initial[0]?.id || '';
  });

  // Currently selected deck object
  const currentDeckObj = useMemo(() => {
    return savedDecks.find((d) => d.id === activeDeckId) || savedDecks[0] || null;
  }, [savedDecks, activeDeckId]);

  const deckQuestions = useMemo(
    () => currentDeckObj?.questions || [],
    [currentDeckObj]
  );

  // Dynamic section/topic list extracted solely from the active study material
  const deckTopics = useMemo(() => {
    const unique = new Set(deckQuestions.map((q) => q.topic).filter(Boolean));
    return ['All Sections', ...unique];
  }, [deckQuestions]);

  // Filters & Shuffle State (Shuffled in a random sequence by default)
  const [selectedTopic, setSelectedTopic] = useState('All Sections');
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
    const filtered = deckQuestions.filter((q) => {
      const matchesTopic =
        selectedTopic === 'All Sections' || q.topic === selectedTopic;
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
    deckQuestions,
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

  // Score calculations for current deck
  const deckCardIds = useMemo(
    () => new Set(deckQuestions.map((q) => String(q.id))),
    [deckQuestions]
  );
  const answeredIds = Object.keys(userAnswers).filter((id) =>
    deckCardIds.has(String(id))
  );
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

  const persistDecks = (nextDecks) => {
    setSavedDecks(nextDecks);
    try {
      if (nextDecks.length === 0) {
        localStorage.removeItem(SAVED_DECKS_STORAGE_KEY);
      } else {
        localStorage.setItem(SAVED_DECKS_STORAGE_KEY, JSON.stringify(nextDecks));
      }
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleDeckCreated = (newDeck) => {
    const updated = [newDeck, ...savedDecks];
    persistDecks(updated);
    setActiveDeckId(newDeck.id);
    setSelectedTopic('All Sections');
    setSearchQuery('');
    setShowMissedOnly(false);
    setUserAnswers({});
    setStreak(0);
    setIsShuffled(true);
    setShuffleSeed((prev) => prev + Math.floor(Math.random() * 10000) + 1);
    setCurrentIndex(0);
  };

  const handleLoadSampleDeck = () => {
    const existingSample = savedDecks.find((d) => d.id === 'deck-sample');
    if (existingSample) {
      setActiveDeckId(existingSample.id);
    } else {
      const sampleDeck = {
        id: 'deck-sample',
        title: 'Sample Deck: Management Principles (90 Qs)',
        questions: sampleQuestions
      };
      const updated = [sampleDeck, ...savedDecks];
      persistDecks(updated);
      setActiveDeckId(sampleDeck.id);
    }
    setSelectedTopic('All Sections');
    setSearchQuery('');
    setShowMissedOnly(false);
    setUserAnswers({});
    setStreak(0);
    setIsShuffled(true);
    setShuffleSeed((prev) => prev + Math.floor(Math.random() * 10000) + 1);
    setCurrentIndex(0);
  };

  const handleDeleteActiveDeck = () => {
    if (!currentDeckObj) return;
    const remaining = savedDecks.filter((d) => d.id !== currentDeckObj.id);
    persistDecks(remaining);
    setActiveDeckId(remaining[0]?.id || '');
    setSelectedTopic('All Sections');
    setSearchQuery('');
    setShowMissedOnly(false);
    setUserAnswers({});
    setStreak(0);
    setCurrentIndex(0);
  };

  const handleClearAllDecks = () => {
    persistDecks([]);
    localStorage.removeItem(LEGACY_CUSTOM_QUESTIONS_KEY);
    setActiveDeckId('');
    setSelectedTopic('All Sections');
    setUserAnswers({});
    setStreak(0);
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
            <GraduationCap size={16} aria-hidden="true" /> QuizFlip • AI Study &amp; Revision
          </div>
          <button
            type="button"
            className="ai-add-notes-btn"
            onClick={handleOpenAiModal}
          >
            <Sparkles size={15} aria-hidden="true" />
            + Upload / Paste Study Material
          </button>
        </div>
        <h1>QuizFlip</h1>
        <p className="subtitle">
          Turn any PDF, Word document, or study notes into a shuffled 4-choice
          revision quiz &amp; flashcard deck.
        </p>
      </header>

      {currentDeckObj ? (
        <>
          {/* Active Study Material Switcher Bar */}
          <section className="deck-switcher-bar" aria-label="Active study material">
            <div className="deck-select-wrapper">
              <FolderOpen size={16} className="deck-icon" aria-hidden="true" />
              <label htmlFor="deck-select" className="visually-hidden">
                Select Study Material Deck
              </label>
              <select
                id="deck-select"
                className="deck-select"
                value={currentDeckObj.id}
                onChange={(e) => {
                  setActiveDeckId(e.target.value);
                  setSelectedTopic('All Sections');
                  setSearchQuery('');
                  setShowMissedOnly(false);
                  setCurrentIndex(0);
                }}
              >
                {savedDecks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.title} ({deck.questions.length} cards)
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="delete-deck-btn"
              onClick={handleDeleteActiveDeck}
              aria-label={`Remove ${currentDeckObj.title}`}
            >
              <Trash2 size={14} aria-hidden="true" />
              Remove Deck
            </button>
          </section>

          {/* Score & Study Stats Bar */}
          <section className="stats-bar" aria-label="Study session statistics">
            <div className="stat-item">
              <span className="stat-label">Answered</span>
              <span className="stat-value">
                {totalAnswered} / {deckQuestions.length}
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

          {/* Toolbar: Section Filter, Search, & Shuffle Controls */}
          <section
            className="revision-toolbar"
            aria-label="Revision controls and filters"
          >
            <div className="toolbar-row">
              <div className="filter-group">
                <label htmlFor="topic-select" className="visually-hidden">
                  Filter by Section or Topic
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
                  {deckTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-group">
                <Search size={15} className="search-icon" aria-hidden="true" />
                <label htmlFor="concept-search" className="visually-hidden">
                  Search questions or concepts
                </label>
                <input
                  id="concept-search"
                  type="search"
                  className="search-input"
                  placeholder="Search questions, concepts, or keywords..."
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
                {isShuffled ? 'Switch to Original Order' : 'In Original Order'}
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
                    setSelectedTopic('All Sections');
                    setSearchQuery('');
                    setShowMissedOnly(false);
                    setCurrentIndex(0);
                  }}
                >
                  Show All {deckQuestions.length} Cards
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        /* Welcome / Empty State when no study material has been uploaded yet */
        <main className="welcome-empty-card">
          <div className="welcome-icon-circle" aria-hidden="true">
            <Upload size={32} />
          </div>
          <h2>Send In Any Study Material to Start</h2>
          <p className="welcome-description">
            Upload a <strong>PDF</strong>, <strong>Word document (.docx)</strong>,
            or <strong>Text file</strong>—or paste your lecture notes from any
            subject. Gemini AI will generate a comprehensive, shuffled 4-choice
            revision quiz covering every area of your material.
          </p>
          <div className="welcome-actions">
            <button
              type="button"
              className="nav-btn primary welcome-primary-btn"
              onClick={handleOpenAiModal}
            >
              <Sparkles size={18} aria-hidden="true" />
              Upload or Paste Your Study Material
            </button>
            <button
              type="button"
              className="nav-btn"
              onClick={handleLoadSampleDeck}
            >
              <BookOpen size={17} aria-hidden="true" />
              Try Sample Deck (90 Cards)
            </button>
          </div>
        </main>
      )}

      {/* Native <dialog> Modal for Gemini AI Notes Generation */}
      <NotesGeneratorModal
        dialogRef={dialogRef}
        onDeckCreated={handleDeckCreated}
        customDeckCount={savedDecks.length}
        onClearAllDecks={handleClearAllDecks}
      />

      {/* Study Tips Footer */}
      <footer className="concept-callout">
        <h4>💡 How QuizFlip Works:</h4>
        <ul>
          <li>
            <strong>Works With Any Course or Document:</strong> Upload any{' '}
            <code>.pdf</code>, Word (<code>.docx</code>), or <code>.txt</code>{' '}
            handout—or paste raw notes—to generate 30–60+ questions touching on
            every section of your material.
          </li>
          <li>
            <strong>Randomized Active Recall:</strong> Questions and their 4
            choices (<code>A</code>, <code>B</code>, <code>C</code>, <code>D</code>
            ) are automatically shuffled into a random sequence every session.
          </li>
          <li>
            <strong>Flip + Instant Grading:</strong> Pick an option (or press keys{' '}
            <code>1</code>–<code>4</code>) for instant feedback, or click the
            card anytime to flip and read the explanation.
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
