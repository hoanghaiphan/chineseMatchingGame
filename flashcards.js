const STORAGE_KEY = 'chinese-flashcards-progress-v2';

let allVocabulary = [];
let deck = [];
let currentIndex = 0;
let currentLevel = 'all';
let progress = loadProgress();

function speak(text, lang = 'zh-CN') {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  } catch (e) {}
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { learned: [], review: [] };
  } catch {
    return { learned: [], review: [] };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getCardKey(card) {
  return `${card.hanzi}|${card.pinyin}|${card.level}`;
}

function filterByLevel(level) {
  if (level === 'all') return [...allVocabulary];
  const targetLevel = Number(level);
  return allVocabulary.filter((card) => card.level === targetLevel);
}

function initFlashcards(vocabulary) {
  allVocabulary = vocabulary;
  bindFlashcardEvents();
  setDeck(document.getElementById('level-select').value);
}

function setDeck(level) {
  currentLevel = level;
  deck = filterByLevel(level);
  currentIndex = 0;
  showCard();
}

function countProgressForDeck() {
  const keys = new Set(deck.map(getCardKey));
  return {
    learned: progress.learned.filter((k) => keys.has(k)).length,
    review: progress.review.filter((k) => keys.has(k)).length,
  };
}

function updateStats() {
  const { learned, review } = countProgressForDeck();
  document.getElementById('learned-count').textContent = learned;
  document.getElementById('review-count').textContent = review;
  document.getElementById('card-position').textContent = deck.length
    ? `${currentIndex + 1} / ${deck.length}`
    : '0 / 0';
}

function showCard() {
  const hanziEl = document.getElementById('hanzi');
  const pinyinEl = document.getElementById('pinyin');
  const meaningEl = document.getElementById('meaning');
  const levelBadgeEl = document.getElementById('level-badge');
  const levelBadgeBackEl = document.getElementById('level-badge-back');
  const actionsEl = document.getElementById('actions');
  const flashcard = document.getElementById('flashcard');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!deck.length) {
    hanziEl.textContent = '—';
    pinyinEl.textContent = '';
    meaningEl.textContent = 'No cards in this deck';
    levelBadgeEl.textContent = '';
    levelBadgeBackEl.textContent = '';
    flashcard.classList.remove('flipped');
    actionsEl.hidden = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    updateStats();
    return;
  }

  const card = deck[currentIndex];
  const levelLabel = `HSK ${card.level}`;

  hanziEl.textContent = card.hanzi;
  pinyinEl.textContent = card.pinyin;
  meaningEl.textContent = card.meaning;
  levelBadgeEl.textContent = levelLabel;
  levelBadgeBackEl.textContent = levelLabel;

  flashcard.classList.remove('flipped');
  actionsEl.hidden = true;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === deck.length - 1;
  updateStats();
}

function flipCard() {
  if (!deck.length) return;
  const flashcard = document.getElementById('flashcard');
  const actionsEl = document.getElementById('actions');
  const wasFlipped = flashcard.classList.contains('flipped');
  flashcard.classList.toggle('flipped');
  const isNowFlipped = flashcard.classList.contains('flipped');
  actionsEl.hidden = !isNowFlipped;

  if (!wasFlipped && isNowFlipped) {
    // Speak the Chinese word when revealing the meaning
    const card = deck[currentIndex];
    if (card) speak(card.hanzi);
  }
}

function markLearned() {
  const card = deck[currentIndex];
  if (card) {
    speak(card.hanzi);
    const key = getCardKey(card);
    if (!progress.learned.includes(key)) progress.learned.push(key);
    progress.review = progress.review.filter((k) => k !== key);
  }
  saveProgress();
  goNext();
}

function markReview() {
  const card = deck[currentIndex];
  if (card) {
    speak(card.hanzi);
    const key = getCardKey(card);
    if (!progress.review.includes(key)) progress.review.push(key);
    progress.learned = progress.learned.filter((k) => k !== key);
  }
  saveProgress();
  goNext();
}

function goNext() {
  if (currentIndex < deck.length - 1) {
    currentIndex++;
    showCard();
  } else {
    updateStats();
    document.getElementById('actions').hidden = true;
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    showCard();
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  currentIndex = 0;
  showCard();
}

function resetProgress() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    progress = { learned: [], review: [] };
    saveProgress();
    setDeck(currentLevel);
  }
}

function bindFlashcardEvents() {
  const flashcard = document.getElementById('flashcard');
  flashcard.addEventListener('click', flipCard);
  flashcard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipCard();
    }
  });

  document.getElementById('prev-btn').addEventListener('click', goPrev);
  document.getElementById('next-btn').addEventListener('click', goNext);
  document.getElementById('learned-btn').addEventListener('click', markLearned);
  document.getElementById('review-btn').addEventListener('click', markReview);
  document.getElementById('shuffle-btn').addEventListener('click', shuffleDeck);
  document.getElementById('reset-btn').addEventListener('click', resetProgress);

  document.getElementById('level-select').addEventListener('change', (e) => {
    setDeck(e.target.value);
    if (typeof updatePictureSetOptions === 'function') {
      updatePictureSetOptions(e.target.value);
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('mode-flashcards').hidden) return;
  if (e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON') return;

  if (e.key === ' ') {
    e.preventDefault();
    flipCard();
  } else if (e.key === 'ArrowRight') {
    goNext();
  } else if (e.key === 'ArrowLeft') {
    goPrev();
  }
});