// Contact form functionality

document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm()
  setTimeout(autoFillForm, 500)
})

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission)

    // Add real-time validation
    const inputs = contactForm.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearFieldError)
    })
  }
}

// Handle form submission
function handleFormSubmission(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData.entries())

  // Validate form
  if (!validateForm(data)) {
    return
  }

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Enviando..."
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    // In a real implementation, you would send data to your server
    console.log("Form data:", data)

    // Reset form
    e.target.reset()

    // Show success message
    showNotification("¡Mensaje enviado correctamente! Te responderemos pronto.", "success")

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false

    // Save to local storage for user convenience
    saveContactData(data)
  }, 2000)
}

// Validate entire form
function validateForm(data) {
  let isValid = true

  // Required fields validation
  const requiredFields = ["name", "email", "subject", "message"]
  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      showFieldError(field, "Este campo es obligatorio")
      isValid = false
    }
  })

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    showFieldError("email", "Por favor ingresa un email válido")
    isValid = false
  }

  // Message length validation
  if (data.message && data.message.length < 10) {
    showFieldError("message", "El mensaje debe tener al menos 10 caracteres")
    isValid = false
  }

  return isValid
}

// Validate individual field
function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  clearFieldError(field.name)

  if (field.hasAttribute("required") && !value) {
    showFieldError(field.name, "Este campo es obligatorio")
    return false
  }

  if (field.type === "email" && value && !isValidEmail(value)) {
    showFieldError(field.name, "Por favor ingresa un email válido")
    return false
  }

  if (field.name === "message" && value && value.length < 10) {
    showFieldError(field.name, "El mensaje debe tener al menos 10 caracteres")
    return false
  }

  return true
}

// Show field error
function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  if (!field) return

  // Remove existing error
  clearFieldError(fieldName)

  // Add error styling
  field.style.borderColor = "#ff0000"

  // Create error message
  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
        color: #ff0000;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    `

  field.parentNode.appendChild(errorDiv)
}

// Clear field error
function clearFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  if (!field) return

  // Reset border color
  field.style.borderColor = ""

  // Remove error message
  const errorDiv = field.parentNode.querySelector(".field-error")
  if (errorDiv) {
    errorDiv.remove()
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Save contact data for user convenience
function saveContactData(data) {
  const contactHistory = getFromLocalStorage("contactHistory") || []

  // Save only non-sensitive data
  const historyEntry = {
    name: data.name,
    email: data.email,
    subject: data.subject,
    timestamp: new Date().toISOString(),
  }

  contactHistory.unshift(historyEntry)

  // Keep only last 5 entries
  if (contactHistory.length > 5) {
    contactHistory.splice(5)
  }

  saveToLocalStorage("contactHistory", contactHistory)
}

// Auto-fill form with previous data
function autoFillForm() {
  const contactHistory = getFromLocalStorage("contactHistory")
  if (contactHistory && contactHistory.length > 0) {
    const lastContact = contactHistory[0]

    const nameField = document.querySelector('[name="name"]')
    const emailField = document.querySelector('[name="email"]')

    if (nameField && !nameField.value) {
      nameField.value = lastContact.name || ""
    }

    if (emailField && !emailField.value) {
      emailField.value = lastContact.email || ""
    }
  }
}

// Declare showNotification function
function showNotification(message, type) {
  const notificationDiv = document.createElement("div")
  notificationDiv.className = `notification ${type}`
  notificationDiv.textContent = message
  document.body.appendChild(notificationDiv)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notificationDiv.remove()
  }, 3000)
}

// Declare getFromLocalStorage function
function getFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return null
  }
}

// Declare saveToLocalStorage function
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
