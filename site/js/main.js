document.addEventListener('DOMContentLoaded', initApp)

let data = {
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  favicon: 'favicon.ico',
  type: 'website',
}

function initApp() {
  const form = document.getElementById('form')
  const results = document.getElementById('headerResult')
  const button = document.getElementById('copyButton')

  loadFormsFromData(form, data)

  form.addEventListener('keyup', handleFormChange)
  form.addEventListener('submit', () => {
    event.preventDefault()
    copyToClipboard(results.textContent)
  })
  button.addEventListener('click', copyToClipboard(results.textContent))
  renderData(data)
}

// Handle change and update data
function handleFormChange() {
  const form = document.forms[0]
  const inputs = [...form.querySelectorAll('input')]

  inputs.map(input => {
    const { name, value } = input
    if (value) data[name] = value
  })
  console.log(data)
  renderData(data)
}

function loadFormsFromData(form, object) {
  for (const key in object) {
    if (form[key]) form[key].value = object[key]
  }
}

function syncFromData(key, value) {
  data[key] = value
  document.forms[0][key].value = value
}

// Render head information
function renderData({
  charset,
  viewport,
  title,
  description,
  author,
  favicon,
  image,
  url,
  type,
}) {
  let header = []

  if (charset) header.push(`<meta charset="${charset}" />`)
  if (viewport) header.push(`<meta name="viewport" content="${viewport}">`)
  if (title) header.push(`<title>${title}</title>`)

  if (description)
    header.push(`<meta name="description" content="${description}">`)
  if (author) header.push(`<meta name="author" content="${author}">`)
  if (favicon)
    header.push(
      `<link rel="shortcut icon" href="${favicon}" type="image/x-icon">`
    )
  // Open Graph / Facebook
  header.push(`\n<!-- Open Graph / Facebook -->`)
  if (title) header.push(`<meta property="og:title" content="${title}" />`)
  if (description)
    header.push(`<meta property="og:description" content="${description}" />`)
  if (url) header.push(`<meta property="og:url" content="${url}" />`)
  if (type) header.push(`<meta property="og:type" content="${type}" />`)
  if (image) header.push(`<meta property="og:image" content="${image}" />`)

  // Twitter
  header.push(`\n<!-- Twitter -->`)
  header.push(`<meta name="twitter:card" content="summary_large_image" />`)

  if (url) header.push(`<meta name="twitter:url" content="${url}" />`)
  if (title) header.push(`<meta name="twitter:title" content="${title}" />`)
  if (description)
    header.push(`<meta name="twitter:description" content="${description}" />`)
  if (image) header.push(`<meta name="twitter:image" content="${image}" />`)

  const resultContainer = document.getElementById('headerResult')
  resultContainer.textContent = header.join('\n')
}

const copyToClipboard = textToCopy => {
  try {
    let el = document.createElement('textarea')
    el.value = textToCopy
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    console.info(`Text copied: ${textToCopy}`)
  } catch (error) {
    console.error(error)
  }
}
