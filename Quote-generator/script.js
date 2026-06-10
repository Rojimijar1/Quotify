// ── Quote Data ────────────────────────────────────────────────────────────────
const quotes = [
  // Motivation
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "motivation" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", category: "motivation" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan", category: "motivation" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James", category: "motivation" },

  // Wisdom
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "wisdom" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
  { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", category: "wisdom" },
  { text: "We do not learn from experience. We learn from reflecting on experience.", author: "John Dewey", category: "wisdom" },

  // Success
  { text: "Success is not final; failure is not fatal. It is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "success" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "success" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser", category: "success" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "success" },

  // Life
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", category: "life" },
  { text: "To live is the rarest thing in the world. Most people just exist.", author: "Oscar Wilde", category: "life" },
  { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", author: "Ralph Waldo Emerson", category: "life" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca", category: "life" },
  { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou", category: "life" },

  // Technology
  { text: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates", category: "technology" },
  { text: "It's not a faith in technology. It's faith in people.", author: "Steve Jobs", category: "technology" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke", category: "technology" },
  { text: "Technology is best when it brings people together.", author: "Matt Mullenweg", category: "technology" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", category: "technology" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "technology" },
];

// ── State ─────────────────────────────────────────────────────────────────────
let currentCategory = "all";
let currentIndex    = 0;
let favorites       = JSON.parse(localStorage.getItem("quotify_favorites") || "[]");

// ── DOM Refs ──────────────────────────────────────────────────────────────────
const quoteText    = document.getElementById("quoteText");
const quoteAuthor  = document.getElementById("quoteAuthor");
const categoryBadge= document.getElementById("categoryBadge");
const quoteNumber  = document.getElementById("quoteNumber");
const quoteCard    = document.getElementById("quoteCard");
const newQuoteBtn  = document.getElementById("newQuoteBtn");
const copyBtn      = document.getElementById("copyBtn");
const twitterBtn   = document.getElementById("twitterBtn");
const favoriteBtn  = document.getElementById("favoriteBtn");
const heartIcon    = document.getElementById("heartIcon");
const toast        = document.getElementById("toast");
const filterBtns   = document.querySelectorAll(".filter-btn");
const favSection   = document.getElementById("favoritesSection");
const favList      = document.getElementById("favoritesList");

// ── Helpers ───────────────────────────────────────────────────────────────────
function getFilteredQuotes() {
  if (currentCategory === "all") return quotes;
  return quotes.filter(q => q.category === currentCategory);
}

function getRandomIndex(pool) {
  if (pool.length === 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * pool.length); } while (idx === currentIndex);
  return idx;
}

function isFavorited(quote) {
  return favorites.some(f => f.text === quote.text);
}

function saveFavorites() {
  localStorage.setItem("quotify_favorites", JSON.stringify(favorites));
}

function updateHeartIcon(quote) {
  if (isFavorited(quote)) {
    heartIcon.setAttribute("fill", "#f76ab4");
    heartIcon.setAttribute("stroke", "#f76ab4");
    favoriteBtn.classList.add("active");
  } else {
    heartIcon.setAttribute("fill", "none");
    heartIcon.setAttribute("stroke", "currentColor");
    favoriteBtn.classList.remove("active");
  }
}

// ── Display Quote ─────────────────────────────────────────────────────────────
function displayQuote(quote, index) {
  quoteCard.classList.add("fade-out");

  setTimeout(() => {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `— ${quote.author}`;
    categoryBadge.textContent = quote.category.charAt(0).toUpperCase() + quote.category.slice(1);
    quoteNumber.textContent = `#${index + 1}`;
    updateHeartIcon(quote);
    quoteCard.classList.remove("fade-out");
  }, 300);
}

function showNewQuote() {
  const pool = getFilteredQuotes();
  if (!pool.length) return;
  currentIndex = getRandomIndex(pool);
  displayQuote(pool[currentIndex], currentIndex);
}

// ── Copy to Clipboard ─────────────────────────────────────────────────────────
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

copyBtn.addEventListener("click", () => {
  const pool  = getFilteredQuotes();
  const quote = pool[currentIndex];
  const text  = `"${quote.text}" — ${quote.author}`;
  navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard!"));
});

// ── Share on Twitter ──────────────────────────────────────────────────────────
twitterBtn.addEventListener("click", () => {
  const pool  = getFilteredQuotes();
  const quote = pool[currentIndex];
  const tweet = encodeURIComponent(`"${quote.text}" — ${quote.author}\n\n#Quotify #Inspiration`);
  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
});

// ── Favorite / Unfavorite ─────────────────────────────────────────────────────
favoriteBtn.addEventListener("click", () => {
  const pool  = getFilteredQuotes();
  const quote = pool[currentIndex];

  if (isFavorited(quote)) {
    favorites = favorites.filter(f => f.text !== quote.text);
    showToast("Removed from favorites");
  } else {
    favorites.push(quote);
    showToast("Saved to favorites!");
  }

  saveFavorites();
  updateHeartIcon(quote);
  renderFavorites();
});

// ── Render Favorites ──────────────────────────────────────────────────────────
function renderFavorites() {
  if (favorites.length === 0) {
    favSection.style.display = "none";
    return;
  }

  favSection.style.display = "block";
  favList.innerHTML = "";

  favorites.forEach((fav, i) => {
    const item = document.createElement("div");
    item.className = "fav-item";
    item.innerHTML = `
      <p>"${fav.text}"</p>
      <span>— ${fav.author}</span>
      <button class="fav-remove" data-index="${i}" title="Remove">✕</button>
    `;
    favList.appendChild(item);
  });

  favList.querySelectorAll(".fav-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      favorites.splice(Number(btn.dataset.index), 1);
      saveFavorites();
      renderFavorites();
      const pool  = getFilteredQuotes();
      updateHeartIcon(pool[currentIndex]);
    });
  });
}

// ── Category Filter ───────────────────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    currentIndex = 0;
    const pool = getFilteredQuotes();
    if (pool.length) displayQuote(pool[0], 0);
  });
});

// ── New Quote Button ──────────────────────────────────────────────────────────
newQuoteBtn.addEventListener("click", showNewQuote);

// ── Init ──────────────────────────────────────────────────────────────────────
(function init() {
  const pool = getFilteredQuotes();
  currentIndex = Math.floor(Math.random() * pool.length);
  displayQuote(pool[currentIndex], currentIndex);
  renderFavorites();
})();
