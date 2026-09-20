const BASE_URL = 'https://api.tvmaze.com'

function stripHtml(html) {
  if (!html) return 'No description available.'
  return html.replace(/<[^>]+>/g, '').trim()
}

function normalize(show) {
  return {
    id: show.id,
    title: show.name,
    year: show.premiered ? show.premiered.slice(0, 4) : 'N/A',
    premiered: show.premiered || 'N/A',
    genres: show.genres?.length ? show.genres : ['Unknown'],
    genre: show.genres?.[0] || 'Unknown',
    rating: show.rating?.average ?? null,
    runtime: show.averageRuntime ? `${show.averageRuntime} min` : 'N/A',
    language: show.language || 'N/A',
    status: show.status || 'N/A',
    poster:
      show.image?.medium ||
      show.image?.original ||
      'https://placehold.co/300x420/1f2937/9ca3af?text=No+Image',
    backdrop: show.image?.original || show.image?.medium || '',
    description: stripHtml(show.summary),
  }
}


export async function getShows(page = 0) {
  const res = await fetch(`${BASE_URL}/shows?page=${page}`)
  if (!res.ok) throw new Error('Failed to load movies')
  const data = await res.json()
  return data.map(normalize)
}


export async function searchShows(query) {
  const res = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
  )
  if (!res.ok) throw new Error('Search failed')
  const data = await res.json()
  return data.map((item) => normalize(item.show))
}

export async function getShowById(id) {
  const res = await fetch(`${BASE_URL}/shows/${id}`)
  if (!res.ok) throw new Error('Failed to load movie')
  const data = await res.json()
  return normalize(data)
}
