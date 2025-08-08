// Games page functionality

let currentPage = 1
let totalPages = 10
const currentFilters = {
  search: "",
  genre: "",
  sort: "newest",
}

// Mapeo de IDs de juego a sus archivos HTML
const gamePages = {
  1: "cyberpunk-adventure.html",
  2: "space-explorer.html",
  3: "medieval-quest.html",
  4: "speed-racer.html",
  5: "mind-bender.html",
  6: "empire-builder.html",
  7: "combat-elite.html",
  8: "dragons-realm.html",
  9: "lost-island.html",
};

// Sample games data
const gamesData = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    genre: ["action", "rpg", "adventure"],
    description: " Cyberpunk 2077 es una historia de acción y aventura en mundo abierto ambientada en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal. Tu personaje es V, un mercenario que persigue un implante único que permite alcanzar la inmortalidad. Podrás personalizar las mejoras cibernéticas, las habilidades y el estilo de juego del personaje para dar forma a un mundo y a una historia que depende de tus decisiones.",
    rating: 4.8,
    image: "assets/images/juegos/cyberpunk 2077/cover.jpg",
    size: "78.5 GB",
    releaseDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Space Explorer",
    genre: "adventure",
    description:"descripcion",
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=400",
    size: "18.2 GB",
    releaseDate: "2024-01-10",
  },
  {
    id: 3,
    title: "Medieval Quest",
    genre: "rpg",
    description:"descripcion",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=400",
    size: "32.1 GB",
    releaseDate: "2024-01-05",
  },
  {
    id: 4,
    title: "Speed Racer",
    genre: "racing",
    description:"descripcion",
    rating: 4.3,
    image: "/placeholder.svg?height=300&width=400",
    size: "15.8 GB",
    releaseDate: "2024-01-01",
  },
  {
    id: 5,
    title: "Mind Bender",
    genre: "puzzle",
    description:"descripcion",
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=400",
    size: "2.3 GB",
    releaseDate: "2023-12-28",
  },
  {
    id: 6,
    title: "Empire Builder",
    genre: "strategy",
    description:"descripcion",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=400",
    size: "12.5 GB",
    releaseDate: "2023-12-25",
  },
  {
    id: 7,
    title: "Combat Elite",
    genre: "action",
    description:"descripcion",
    rating: 4.4,
    image: "/placeholder.svg?height=300&width=400",
    size: "28.9 GB",
    releaseDate: "2023-12-20",
  },
  {
    id: 8,
    title: "Dragon's Realm",
    genre: "rpg",
    description:"descripcion",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=400",
    size: "45.2 GB",
    releaseDate: "2023-12-15",
  },
  {
    id: 9,
    title: "Lost Island",
    genre: "adventure",
    description:"descripcion",
    rating: 4.2,
    image: "/placeholder.svg?height=300&width=400",
    size: "22.7 GB",
    releaseDate: "2023-12-10",
  },
]

// Debounce function declaration
function debounce(func, wait) {
  let timeout
  return function (...args) {
    
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Initialize games page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("gamesGrid")) {
    initializeFilters()
    loadGames()
    initializePagination()
  }
  setTimeout(handleURLParameters, 100)
})

// Initialize filter functionality
function initializeFilters() {
  const searchInput = document.getElementById("searchInput")
  const genreFilter = document.getElementById("genreFilter")
  const sortFilter = document.getElementById("sortFilter")
  const searchBtn = document.querySelector(".search-btn")

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function () {
        currentFilters.search = this.value.toLowerCase()
        currentPage = 1
        loadGames()
      }, 300),
    )
  }

  if (genreFilter) {
    genreFilter.addEventListener("change", function () {
      currentFilters.genre = this.value
      currentPage = 1
      loadGames()
    })
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", function () {
      currentFilters.sort = this.value
      currentPage = 1
      loadGames()
    })
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      loadGames()
    })
  }
}

// Load and display games
function loadGames() {
  const gamesGrid = document.getElementById("gamesGrid")
  if (!gamesGrid) return

  // Filter games
  const filteredGames = gamesData.filter((game) => {
    const matchesSearch = !currentFilters.search || game.title.toLowerCase().includes(currentFilters.search)
    const matchesGenre = !currentFilters.genre || game.genre.includes(currentFilters.genre)

    return matchesSearch && matchesGenre
  })

  // Sort games
  filteredGames.sort((a, b) => {
    switch (currentFilters.sort) {
      case "popular":
        return b.rating - a.rating
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.title.localeCompare(b.title)
      case "newest":
      default:
        return new Date(b.releaseDate) - new Date(a.releaseDate)
    }
  })

  // Pagination
  const gamesPerPage = 6
  const startIndex = (currentPage - 1) * gamesPerPage
  const endIndex = startIndex + gamesPerPage
  const paginatedGames = filteredGames.slice(startIndex, endIndex)

  // Update total pages
  totalPages = Math.ceil(filteredGames.length / gamesPerPage)

  // Render games
  gamesGrid.innerHTML = ""

  if (paginatedGames.length === 0) {
    gamesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: #b0b0b0;">
                <h3>No se encontraron juegos</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
            </div>
        `
    return
  }

  paginatedGames.forEach((game) => {
    const gameCard = createGameCard(game)
    gamesGrid.appendChild(gameCard)
  })

  updatePaginationInfo()
}

// Create game card element
function createGameCard(game) {
  const article = document.createElement("article")
  article.className = "game-card"
  article.style.opacity = "0"
  article.style.transform = "translateY(30px)"

  const stars = "★".repeat(Math.floor(game.rating)) + "☆".repeat(5 - Math.floor(game.rating))

  article.innerHTML = `
        <div class="game-image">
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="game-overlay">
                <a href="juegos/${gamePages[game.id]}" class="btn btn-small">Ver Detalles</a>
            </div>
        </div>
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-genre">${getGenreDisplayName(game.genre)}</p>
            <p class="game-description-card">${game.description}</p>
            <div class="game-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">${game.rating}/5</span>
            </div>
            <div class="game-size" style="margin-top: 0.5rem; color: #b0b0b0; font-size: 0.9rem;">
                ${game.size}
            </div>
        </div>
    `

  // Animate in
  setTimeout(() => {
    article.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    article.style.opacity = "1"
    article.style.transform = "translateY(0)"
  }, 100)

  return article
}

// Get display name for genre
function getGenreDisplayName(genres) {
  const genreNames = {
    action: "Acción",
    rpg: "RPG",
    racing: "Carreras",
    puzzle: "Puzzle",
    strategy: "Estrategia",
    adventure: "Aventura",
    horror: "Horror",
    simulation: "Simulación",
    sports: "Deportes",
    fps: "FPS",
    sandbox: "Mundo Abierto",
  }
  if (Array.isArray(genres)) {
    return genres.map(g => genreNames[g] || g).join(", ");
  }
  return genreNames[genres] || genres
}

// Initialize pagination
function initializePagination() {
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        loadGames()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++
        loadGames()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }
}

// Update pagination info
function updatePaginationInfo() {
  const currentPageSpan = document.getElementById("currentPage")
  const totalPagesSpan = document.getElementById("totalPages")
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  if (currentPageSpan) currentPageSpan.textContent = currentPage
  if (totalPagesSpan) totalPagesSpan.textContent = totalPages

  if (prevBtn) {
    prevBtn.disabled = currentPage === 1
    prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1"
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages
    nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1"
  }
}

// Handle URL parameters
function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")

  if (category) {
    const genreFilter = document.getElementById("genreFilter")
    if (genreFilter) {
      genreFilter.value = category
      currentFilters.genre = category
      loadGames()
    }
  }
}
