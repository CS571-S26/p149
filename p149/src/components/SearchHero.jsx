import { Button, Container } from 'react-bootstrap'
import { campsites } from '../campsites'

export default function SearchHero({ inputVal, setInput, onSearch }) {
  return (
    <div className="hero-section">
      <Container>
        <h1>Find Your Perfect<br /><em>Wild Place</em></h1>
        <p className="mt-2 mb-4">
          Explore {campsites.length} curated campsites across America — rated by real adventurers.
        </p>
        <form className="search-bar" onSubmit={onSearch}>
          <span style={{ fontSize: '1.1rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, state, or type…"
            value={inputVal}
            onChange={e => setInput(e.target.value)}
          />
          <Button type="submit" variant="primary" size="sm">Search</Button>
        </form>
      </Container>
    </div>
  )
}
