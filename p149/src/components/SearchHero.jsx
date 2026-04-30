import { Button, Container } from 'react-bootstrap'
import { campsites } from '../Campsites'

const totalReviews = campsites.reduce((sum, c) => sum + c.reviews, 0)
const states = new Set(campsites.map(c => c.state)).size
const avgRating = (
  campsites.reduce((sum, c) => sum + c.rating, 0) / campsites.length
).toFixed(1)

const STATS = [
  { value: campsites.length, label: 'Places' },
  { value: states,           label: 'States' },
  { value: totalReviews.toLocaleString(), label: 'Reviews' },
  { value: avgRating + ' ★', label: 'Avg rating' },
]

export default function SearchHero({ inputVal, setInput, onSearch }) {
  return (
    <div className="hero-section">
      <Container>
        <h1>Browse camps and trail bases</h1>
        <p className="mt-2 mb-4">
          Search {campsites.length} spots with hike-in access, filters by activity, and community ratings.
        </p>
        <form className="search-bar" onSubmit={onSearch} role="search" aria-label="Search campsites">
          <span style={{ fontSize: '1.1rem' }} aria-hidden="true">🔍</span>
          <label htmlFor="hero-camp-search" className="visually-hidden">
            Search by name, state, or tag
          </label>
          <input
            id="hero-camp-search"
            type="search"
            placeholder="Name, state, or tag…"
            value={inputVal}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
          />
          <Button type="submit" variant="primary" size="sm">Search</Button>
        </form>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          gap: '28px',
          flexWrap: 'wrap',
          marginTop: '32px',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                color: 'var(--sand)',
                fontWeight: 700,
                lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.86)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: '3px',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
