// Articles page functionality

let currentPage = 1
let totalPages = 10
const currentFilters = {
  search: "",
  category: "",
  sort: "newest",
}

// Sample articles data
const articlesData = [
  {
    id: 1,
    title: "El Futuro del Gaming: Realidad Virtual y Más Allá",
    category: "analysis",
    author: "Alex Rodriguez",
    date: "2024-01-15",
    readTime: "8 min",
    views: 1250,
    image: "/placeholder.svg?height=200&width=350",
    excerpt:
      "Exploramos las tecnologías emergentes que están transformando la industria de los videojuegos y cómo afectarán nuestra forma de jugar.",
    featured: true,
  },
  {
    id: 2,
    title: "Los 10 Mejores Juegos de 2024 Hasta Ahora",
    category: "reviews",
    author: "Maria Garcia",
    date: "2024-01-10",
    readTime: "12 min",
    views: 2100,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Nuestra selección de los títulos más impresionantes que han llegado este año, desde indies hasta AAA.",
    featured: true,
  },
  {
    id: 3,
    title: "Guía Completa: Cómo Optimizar tu PC para Gaming",
    category: "guides",
    author: "Carlos Martinez",
    date: "2024-01-08",
    readTime: "15 min",
    views: 1800,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Todo lo que necesitas saber para sacar el máximo rendimiento de tu setup gaming sin gastar una fortuna.",
    featured: false,
  },
  {
    id: 4,
    title: "Cyberpunk 2077: Phantom Liberty - Review Completo",
    category: "reviews",
    author: "Ana Lopez",
    date: "2024-01-05",
    readTime: "10 min",
    views: 3200,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Analizamos la expansión más esperada del año y si logra redimir las promesas del juego base.",
    featured: false,
  },
  {
    id: 5,
    title: "Noticias: Steam Deck 2 Confirmado para 2025",
    category: "news",
    author: "David Kim",
    date: "2024-01-03",
    readTime: "5 min",
    views: 4500,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Valve confirma oficialmente el desarrollo de la segunda generación de su consola portátil.",
    featured: false,
  },
  {
    id: 6,
    title: "Entrevista Exclusiva con el Creador de Hollow Knight",
    category: "interviews",
    author: "Sofia Chen",
    date: "2024-01-01",
    readTime: "20 min",
    views: 1900,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Hablamos con Team Cherry sobre Silksong, el desarrollo indie y el futuro del metroidvania.",
    featured: false,
  },
  {
    id: 7,
    title: "Tips Pro: Domina el Ranked en Valorant",
    category: "tips",
    author: "Miguel Torres",
    date: "2023-12-28",
    readTime: "7 min",
    views: 2800,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Estrategias avanzadas y consejos de profesionales para subir de rango rápidamente.",
    featured: false,
  },
  {
    id: 8,
    title: "Análisis: El Impacto de Game Pass en la Industria",
    category: "analysis",
    author: "Laura Ruiz",
    date: "2023-12-25",
    readTime: "14 min",
    views: 1600,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Cómo los servicios de suscripción están cambiando la forma en que consumimos videojuegos.",
    featured: false,
  },
  {
    id: 9,
    title: "Guía: Los Mejores Mods para Skyrim en 2024",
    category: "guides",
    author: "Roberto Silva",
    date: "2023-12-20",
    readTime: "18 min",
    views: 3800,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Una selección curada de los mods más impresionantes para revitalizar tu experiencia en Skyrim.",
    featured: false,
  },
  {
    id: 10,
    title: "Breaking: Nintendo Direct Anuncia Nuevos Títulos",
    category: "news",
    author: "Elena Morales",
    date: "2023-12-18",
    readTime: "6 min",
    views: 5200,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Resumen completo de todos los anuncios del último Nintendo Direct con fechas y trailers.",
    featured: false,
  },
  {
    id: 11,
    title: "Review: Spider-Man 2 - ¿Vale la Pena la Espera?",
    category: "reviews",
    author: "Fernando Vega",
    date: "2023-12-15",
    readTime: "11 min",
    views: 2700,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Analizamos el último juego de Spider-Man y si cumple con las altas expectativas de los fans.",
    featured: false,
  },
  {
    id: 12,
    title: "Tips: Cómo Construir tu Primera PC Gaming",
    category: "tips",
    author: "Andrea Jimenez",
    date: "2023-12-12",
    readTime: "16 min",
    views: 4100,
    image: "/placeholder.svg?height=200&width=350",
    excerpt: "Guía paso a paso para principiantes que quieren armar su primera computadora para juegos.",
    featured: false,
  },
]

// Debounce function
function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Initialize articles page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("articlesGrid")) {
    initializeFilters()
    loadArticles()
    initializePagination()
  }
  setTimeout(handleURLParameters, 100)
})

// Initialize filter functionality
function initializeFilters() {
  const searchInput = document.getElementById("searchInput")
  const categoryFilter = document.getElementById("categoryFilter")
  const sortFilter = document.getElementById("sortFilter")
  const searchBtn = document.querySelector(".search-btn")

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function () {
        currentFilters.search = this.value.toLowerCase()
        currentPage = 1
        loadArticles()
      }, 300),
    )
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      currentFilters.category = this.value
      currentPage = 1
      loadArticles()
    })
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", function () {
      currentFilters.sort = this.value
      currentPage = 1
      loadArticles()
    })
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      loadArticles()
    })
  }
}

// Load and display articles
function loadArticles() {
  const articlesGrid = document.getElementById("articlesGrid")
  if (!articlesGrid) return

  // Filter articles
  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch =
      !currentFilters.search ||
      article.title.toLowerCase().includes(currentFilters.search) ||
      article.excerpt.toLowerCase().includes(currentFilters.search) ||
      article.author.toLowerCase().includes(currentFilters.search)
    const matchesCategory = !currentFilters.category || article.category === currentFilters.category

    return matchesSearch && matchesCategory
  })

  // Sort articles
  filteredArticles.sort((a, b) => {
    switch (currentFilters.sort) {
      case "popular":
        return b.views - a.views
      case "trending":
        // Simulate trending based on recent views and date
        const aScore = b.views * (new Date(a.date).getTime() / 1000000000)
        const bScore = a.views * (new Date(b.date).getTime() / 1000000000)
        return bScore - aScore
      case "title":
        return a.title.localeCompare(b.title)
      case "newest":
      default:
        return new Date(b.date) - new Date(a.date)
    }
  })

  // Pagination
  const articlesPerPage = 6
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  // Update total pages
  totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  // Render articles
  articlesGrid.innerHTML = ""

  if (paginatedArticles.length === 0) {
    articlesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: #b0b0b0;">
        <h3>No se encontraron artículos</h3>
        <p>Intenta ajustar tus filtros de búsqueda</p>
      </div>
    `
    return
  }

  paginatedArticles.forEach((article) => {
    const articleCard = createArticleCard(article)
    articlesGrid.appendChild(articleCard)
  })

  updatePaginationInfo()
}

// Create article card element
function createArticleCard(article) {
  const articleElement = document.createElement("article")
  articleElement.className = "article-card"
  articleElement.style.opacity = "0"
  articleElement.style.transform = "translateY(30px)"

  const formattedDate = formatDate(article.date)
  const categoryDisplay = getCategoryDisplayName(article.category)

  articleElement.innerHTML = `
    <div class="article-image">
      <img src="${article.image}" alt="${article.title}" loading="lazy">
      <div class="article-category-badge">${categoryDisplay}</div>
      <div class="article-overlay">
        <a href="article-detail.html?id=${article.id}" class="btn btn-small">Leer Artículo</a>
      </div>
    </div>
    <div class="article-content">
      <h3 class="article-title">
        <a href="article-detail.html?id=${article.id}">${article.title}</a>
      </h3>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-meta">
        <span class="article-author">Por ${article.author}</span>
        <span class="article-date">${formattedDate}</span>
        <span class="article-read-time">${article.readTime} lectura</span>
        <span class="article-views">${formatViews(article.views)} vistas</span>
      </div>
    </div>
  `

  // Animate in
  setTimeout(() => {
    articleElement.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    articleElement.style.opacity = "1"
    articleElement.style.transform = "translateY(0)"
  }, 100)

  return articleElement
}

// Get display name for category
function getCategoryDisplayName(category) {
  const categoryNames = {
    reviews: "Reviews",
    news: "Noticias",
    guides: "Guías",
    analysis: "Análisis",
    interviews: "Entrevistas",
    tips: "Tips & Trucos",
  }
  return categoryNames[category] || category
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString)
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("es-ES", options)
}

// Format views count
function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K"
  }
  return views.toString()
}

// Initialize pagination
function initializePagination() {
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        loadArticles()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++
        loadArticles()
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
    const categoryFilter = document.getElementById("categoryFilter")
    if (categoryFilter) {
      categoryFilter.value = category
      currentFilters.category = category
      loadArticles()
    }
  }
}

// Search functionality
function searchArticles(query) {
  currentFilters.search = query.toLowerCase()
  currentPage = 1
  loadArticles()
}

// Filter by category
function filterByCategory(category) {
  currentFilters.category = category
  currentPage = 1
  loadArticles()
}

// Sort articles
function sortArticles(sortType) {
  currentFilters.sort = sortType
  currentPage = 1
  loadArticles()
}
