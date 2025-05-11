document.getElementById('filterForm').addEventListener('submit', async e => {
  e.preventDefault()
  const form = e.target
  const params = new URLSearchParams()

  new FormData(form).forEach((value, key) => {
    params.append(key, value)
  })

  try {
    const res = await fetch('/exercises?' + params.toString())
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const exercises = await res.json()

    const container = document.getElementById('results')
    if (exercises.length === 0) {
      container.innerHTML = '<p>No exercises found.</p>'
    } else {
      container.innerHTML = exercises.map(ex => `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <a href="exercise.html?id=${encodeURIComponent(ex.id)}" target="_blank"
                 class="text-decoration-none mb-3">
                <h5 class="card-title">${ex.name}</h5>
              </a>
      
              <!-- Wrap all the details here and push them down -->
              <div class="mt-auto">
                <p class="card-text mb-1"><strong>Level:</strong> ${ex.level}</p>
                <p class="card-text mb-1"><strong>Equipment:</strong> ${ex.equipment}</p>
                <p class="card-text mb-1"><strong>Primary Muscle:</strong> ${ex.primaryMuscles}</p>
                <p class="card-text"><strong>Category:</strong> ${ex.category}</p>
              </div>
            </div>
          </div>
        </div>
      `).join('')
    }
  } catch (err) {
    console.error('Error fetching exercises:', err)
    document.getElementById('results').innerHTML =
      '<p class="text-danger">Failed to load exercises.</p>'
  }
})
