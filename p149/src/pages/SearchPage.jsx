import { useState, useMemo, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { campsites } from '../Campsites'
import CampCard from '../components/CampCard'
import SearchHero from '../components/SearchHero'
import CampPagination from '../components/CampPagination'
import FilterMenu from '../components/FilterMenu'

const SITES_PER_PAGE = 6
const ALL_TAGS = [
  'Tent', 'RV', 'Family', 'Pet-Friendly', 'Hiking', 'Fishing',
  'Stargazing', 'Wildlife', 'Backcountry', 'Ocean Views', 'Fall Foliage', 'Paddling'
]

export default function SearchPage({ saved, onSave, compared, onCompare }) {
  const [inputVal, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    tags: [],
    maxPrice: 40,
    minSites: 5,
    minRating: 0,
  })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => campsites.filter(c => {
    const q = query.trim().toLowerCase()
    const matchQ = !q ||
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    const priceVal = Number(c.price.replace(/[^0-9.]/g, ''))
    const matchTags =
      filters.tags.length === 0 || filters.tags.every(tag => c.tags.includes(tag))
    const matchPrice = priceVal <= filters.maxPrice
    const matchSites = c.sites >= filters.minSites
    const matchRating = c.rating >= filters.minRating
    return matchQ && matchTags && matchPrice && matchSites && matchRating
  }), [query, filters])

  const totalPages = Math.ceil(filtered.length / SITES_PER_PAGE)
  const paged = filtered.slice((page - 1) * SITES_PER_PAGE, page * SITES_PER_PAGE)
  const activeFilterCount =
    filters.tags.length +
    (filters.maxPrice < 40 ? 1 : 0) +
    (filters.minSites > 5 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0)

  const handleSearch = e => {
    e.preventDefault()
    setQuery(inputVal)
    setPage(1)
  }
  const handleFilterApply = next => {
    setFilters(next)
    setPage(1)
  }
  const handleClearFilters = () => {
    setFilters({
      tags: [],
      maxPrice: 40,
      minSites: 5,
      minRating: 0,
    })
    setPage(1)
  }

  useEffect(() => {
    setPage(1)
  }, [query])

  return (
    <>
      <SearchHero inputVal={inputVal} setInput={setInput} onSearch={handleSearch} />

      <Container className="py-4">
        <FilterMenu
          show={showFilters}
          onToggle={() => setShowFilters(prev => !prev)}
          filters={filters}
          onApply={handleFilterApply}
          onClear={handleClearFilters}
          allTags={ALL_TAGS}
          activeFilterCount={activeFilterCount}
        />
        {(inputVal || query || activeFilterCount > 0) && (
          <div className="mb-3">
            <Button
              variant="outline-secondary"
              className="rounded-pill"
              onClick={() => {
                setInput('')
                setQuery('')
                handleClearFilters()
              }}
            >
              Clear search & filters
            </Button>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title h5 mb-0">
            {filtered.length} {filtered.length === 1 ? 'campsite' : 'campsites'} found
            {query.trim() && (
              <span style={{ color: 'var(--smoke)', fontSize: '0.95rem', fontFamily: 'DM Sans' }}>
                {' '}for "{query.trim()}"
              </span>
            )}
          </h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--smoke)' }}>
            Page {page} of {Math.max(totalPages, 1)}
          </span>
        </div>

        {paged.length === 0 ? (
          <div className="saved-empty">
            <div className="empty-icon">🔎</div>
            <h3>No campsites found</h3>
            <p>Try a different search term or clear the filters.</p>
          </div>
        ) : (
          <Row className="g-4">
            {paged.map(camp => (
              <Col key={camp.id} sm={6} lg={4}>
                <CampCard
                  camp={camp}
                  isSaved={saved.some(s => s.id === camp.id)}
                  onSave={onSave}
                  isCompared={compared.some(c => c.id === camp.id)}
                  onCompare={onCompare}
                />
              </Col>
            ))}
          </Row>
        )}

        <CampPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </Container>
    </>
  )
}
