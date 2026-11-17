import { useState, useEffect } from 'react';
import {
  Sparkles,
  Upload,
  Loader2,
  X,
  KeyRound,
  FileText,
  Trash2,
  FileCheck2
} from 'lucide-react';
import { generateQuestionsFromNotes } from '../services/geminiGenerator';

const STORAGE_KEY_API = 'quizflip_gemini_api_key';

function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const commaIndex = result.indexOf(',');
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => reject(new Error('Failed to read PDF file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Native <dialog> modal for generating 4-choice flashcards from any study material:
 * PDF documents (.pdf), Word documents (.docx/.doc), text files (.txt/.md), or pasted notes.
 *
 * @param {Object} props
 * @param {React.RefObject<HTMLDialogElement>} props.dialogRef - Ref to the native <dialog> element
 * @param {Function} props.onDeckCreated - (newDeck: { id, title, questions }) => void
 * @param {number} props.customDeckCount - Number of custom decks currently saved
 * @param {Function} props.onClearAllDecks - () => void
 */
export function NotesGeneratorModal({
  dialogRef,
  onDeckCreated,
  customDeckCount,
  onClearAllDecks
}) {
  const [notesText, setNotesText] = useState('');
  const [attachedPdf, setAttachedPdf] = useState(null);
  const [importedDocName, setImportedDocName] = useState('');
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [questionCount, setQuestionCount] = useState('comprehensive');
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_API) || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasEnvKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY);

  // Fallback for <dialog closedby="any"> in browsers without native closedBy support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e) => {
      if (pressedOutside && isOutside(e) && !isGenerating) {
        dialog.close();
      }
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, [dialogRef, isGenerating]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setIsReadingFile(true);

    const lowerName = file.name.toLowerCase();
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '');

    try {
      // 1. PDF files (.pdf) — passed natively to Gemini as a multimodal document
      if (file.type === 'application/pdf' || lowerName.endsWith('.pdf')) {
        const base64Data = await readFileAsBase64(file);
        setAttachedPdf({
          name: file.name,
          sizeLabel: formatBytes(file.size),
          base64Data
        });
        if (!topicName.trim()) {
          setTopicName(cleanTitle);
        }
      }
      // 2. Word documents (.docx or .doc) — extract text via mammoth
      else if (
        lowerName.endsWith('.docx') ||
        lowerName.endsWith('.doc') ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        const arrayBuffer = await file.arrayBuffer();
        let extractedText = '';

        try {
          const mammothModule = await import('mammoth');
          const mammoth = mammothModule.default || mammothModule;
          const result = await mammoth.extractRawText({ arrayBuffer });
          extractedText = (result.value || '').trim();
        } catch {
          const decoder = new TextDecoder('utf-8', { fatal: false });
          const raw = decoder.decode(arrayBuffer);
          extractedText = raw
            .replace(/[^\x20-\x7E\r\n]+/g, ' ')
            .replace(/\s{3,}/g, '\n')
            .trim();
        }

        if (!extractedText || extractedText.length < 20) {
          throw new Error(
            'Could not extract enough readable text from this Word document. Try saving it as .docx or .pdf.'
          );
        }

        setNotesText((prev) =>
          prev ? `${prev}\n\n${extractedText}` : extractedText
        );
        setImportedDocName(file.name);
        if (!topicName.trim()) {
          setTopicName(cleanTitle);
        }
      }
      // 3. Plain text files (.txt, .md, .csv, etc.)
      else {
        const text = await file.text();
        setNotesText((prev) => (prev ? `${prev}\n\n${text}` : text));
        setImportedDocName(file.name);
        if (!topicName.trim()) {
          setTopicName(cleanTitle);
        }
      }
    } catch (err) {
      setErrorMsg(
        err?.message ||
          'Could not read that file. Please upload a .pdf, .docx, .txt, or .md file.'
      );
    } finally {
      setIsReadingFile(false);
      e.target.value = '';
    }
  };

  const canSubmit =
    !isGenerating &&
    !isReadingFile &&
    (Boolean(attachedPdf) || notesText.trim().length >= 20);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsGenerating(true);

    try {
      if (customApiKey.trim()) {
        localStorage.setItem(STORAGE_KEY_API, customApiKey.trim());
      }

      const { deckTitle, questions } = await generateQuestionsFromNotes({
        notesText,
        pdfDocument: attachedPdf,
        topicName,
        count:
          questionCount === 'comprehensive'
            ? 'comprehensive'
            : Number(questionCount),
        apiKey: customApiKey.trim() || undefined
      });

      onDeckCreated({
        id: `deck-${Date.now()}`,
        title: deckTitle,
        questions
      });

      // Reset form and close modal
      setNotesText('');
      setAttachedPdf(null);
      setImportedDocName('');
      setTopicName('');
      dialogRef.current?.close();
    } catch (err) {
      setErrorMsg(
        err?.message ||
          'Failed to generate questions with Gemini. Check your API key or internet connection.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      setErrorMsg('');
      dialogRef.current?.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="ai-notes-dialog"
      className="notes-dialog"
      aria-labelledby="ai-notes-dialog-title"
      {...{ closedby: 'any' }}
    >
      <div className="dialog-inner">
        <div className="dialog-header">
          <div className="dialog-title-group">
            <span className="dialog-icon-badge" aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <div>
              <h2 id="ai-notes-dialog-title">Upload or Paste Study Material</h2>
              <p className="dialog-subtitle">
                Send in any <strong>PDF</strong>, <strong>Word (.docx)</strong>,{' '}
                <strong>Text file</strong>, or pasted notes — Gemini builds a
                complete, shuffled 4-choice revision deck.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="dialog-close-btn"
            onClick={handleClose}
            disabled={isGenerating}
            aria-label="Close Study Material Generator"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form className="dialog-form" onSubmit={handleSubmit}>
          <div className="form-row-two">
            <div className="form-field">
              <label htmlFor="notes-topic-input">
                Subject / Material Name <span className="optional-tag">(Optional)</span>
              </label>
              <input
                id="notes-topic-input"
                type="text"
                className="dialog-input"
                placeholder="e.g. Biology Ch. 4, Contract Law, Algorithms..."
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            <div className="form-field">
              <label htmlFor="notes-count-select">Coverage &amp; Question Count</label>
              <select
                id="notes-count-select"
                className="dialog-input"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                disabled={isGenerating}
              >
                <option value="comprehensive">
                  Comprehensive: Every Area (30–50+ Qs)
                </option>
                <option value="15">15 Questions</option>
                <option value="25">25 Questions</option>
                <option value="40">40 Questions</option>
                <option value="60">60 Questions (Full Exam Bank)</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <div className="label-with-action">
              <label htmlFor="raw-notes-textarea">
                Study Material {attachedPdf ? '(Optional extra instructions)' : ''}
              </label>
              <label htmlFor="notes-file-upload" className="upload-file-btn">
                {isReadingFile ? (
                  <>
                    <Loader2 size={13} className="spin-loader" aria-hidden="true" />
                    Reading file...
                  </>
                ) : (
                  <>
                    <Upload size={13} aria-hidden="true" />
                    Choose PDF, Word (.docx), or TXT
                  </>
                )}
                <input
                  id="notes-file-upload"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.md,.csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
                  onChange={handleFileUpload}
                  disabled={isGenerating || isReadingFile}
                  className="visually-hidden"
                />
              </label>
            </div>

            {/* Attached PDF or Imported Word Document Banner */}
            {attachedPdf && (
              <div className="attached-file-pill">
                <FileCheck2 size={16} className="file-pill-icon" aria-hidden="true" />
                <div className="file-pill-info">
                  <strong>{attachedPdf.name}</strong>
                  <span>
                    {attachedPdf.sizeLabel} • PDF attached for Gemini AI reading
                  </span>
                </div>
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => setAttachedPdf(null)}
                  disabled={isGenerating}
                  aria-label={`Remove attached PDF ${attachedPdf.name}`}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            )}

            {!attachedPdf && importedDocName && (
              <div className="attached-file-pill doc-extracted">
                <FileCheck2 size={16} className="file-pill-icon" aria-hidden="true" />
                <div className="file-pill-info">
                  <strong>Extracted from {importedDocName}</strong>
                  <span>You can review or edit the extracted text below</span>
                </div>
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => setImportedDocName('')}
                  aria-label="Dismiss extracted file notice"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            )}

            <span id="notes-hint" className="field-hint">
              {attachedPdf
                ? 'Your PDF is ready! Click Generate below, or type extra focus instructions here.'
                : 'Upload any .pdf, .docx, or .txt document above, or paste your study material directly below.'}
            </span>
            <textarea
              id="raw-notes-textarea"
              className="dialog-textarea"
              rows={attachedPdf ? 4 : 7}
              aria-describedby="notes-hint"
              placeholder={
                attachedPdf
                  ? 'Optional: Add any specific instructions for your PDF (e.g. "Focus on formulas and key definitions")...'
                  : 'Paste any lecture notes, textbook chapters, or study guides here — or click "Choose PDF, Word (.docx), or TXT" above...'
              }
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              disabled={isGenerating}
              required={!attachedPdf}
              autoFocus
            />
          </div>

          {/* API Key Status / Override */}
          <div className="api-key-bar">
            <div className="api-key-status">
              <KeyRound size={14} aria-hidden="true" />
              <span>
                {customApiKey.trim()
                  ? 'Using custom Gemini API key'
                  : hasEnvKey
                    ? 'Gemini API key configured'
                    : 'No API key detected'}
              </span>
              <button
                type="button"
                className="link-btn"
                onClick={() => setShowKeyInput((prev) => !prev)}
              >
                {showKeyInput ? 'Hide key' : 'Change key'}
              </button>
            </div>

            {showKeyInput && (
              <div className="form-field api-key-field">
                <label htmlFor="gemini-api-key-input">
                  Custom Gemini API Key (overrides default)
                </label>
                <input
                  id="gemini-api-key-input"
                  type="password"
                  className="dialog-input"
                  placeholder="Paste Gemini API key..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  disabled={isGenerating}
                  autoComplete="off"
                />
              </div>
            )}
          </div>

          {/* Error Live Region */}
          <div aria-live="polite">
            {errorMsg && (
              <div className="dialog-error" role="alert">
                {errorMsg}
              </div>
            )}
          </div>

          <div className="dialog-footer">
            {customDeckCount > 0 ? (
              <button
                type="button"
                className="clear-custom-btn"
                onClick={onClearAllDecks}
                disabled={isGenerating}
              >
                <Trash2 size={14} aria-hidden="true" />
                Delete All Saved Decks ({customDeckCount})
              </button>
            ) : (
              <span className="footer-note">
                <FileText size={13} aria-hidden="true" /> Works with any PDF,
                Word (.docx), or text handout
              </span>
            )}

            <div className="dialog-actions">
              <button
                type="button"
                className="nav-btn"
                onClick={handleClose}
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="nav-btn primary generate-submit-btn"
                disabled={!canSubmit}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="spin-loader" aria-hidden="true" />
                    Building Your Quiz...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} aria-hidden="true" />
                    {questionCount === 'comprehensive'
                      ? 'Generate Full Quiz'
                      : `Generate ${questionCount} Questions`}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
