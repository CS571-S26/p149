import { useState, useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { campsites } from '../campsites'
import CampCard from '../components/CampCard'
import SearchHero from '../components/SearchHero'
import FilterBar from '../components/FilterBar'
import CampPagination from '../components/CampPagination'

const SITES_PER_PAGE = 6

export default function SearchPage({ saved, onSave, compared, onCompare }) {
  const [query,    setQuery]  = useState('')
  const [inputVal, setInput]  = useState('')
  const [activeTag, setTag]   = useState(null)
  const [page,     setPage]   = useState(1)

  const filtered = useMemo(() => campsites.filter(c => {
    const q = query.toLowerCase()
    const matchQ = !q ||
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    const matchTag = !activeTag || c.tags.includes(activeTag)
    return matchQ && matchTag
  }), [query, activeTag])

  const totalPages = Math.ceil(filtered.length / SITES_PER_PAGE)
  const paged = filtered.slice((page - 1) * SITES_PER_PAGE, page * SITES_PER_PAGE)

  const handleSearch = e => { e.preventDefault(); setQuery(inputVal); setPage(1) }
  const handleTag = tag => { setTag(prev => prev === tag ? null : tag); setPage(1) }
  const handleClear = () => { setQuery(''); setInput(''); setTag(null); setPage(1) }

  return (
    <>
      <SearchHero inputVal={inputVal} setInput={setInput} onSearch={handleSearch} />

      <Container className="py-4">
        <FilterBar
          activeTag={activeTag}
          onTagClick={handleTag}
          query={query}
          onClear={handleClear}
        />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-title" style={{ fontSize: '1.15rem' }}>
            {filtered.length} {filtered.length === 1 ? 'campsite' : 'campsites'} found
            {query && (
              <span style={{ color: 'var(--smoke)', fontSize: '0.95rem', fontFamily: 'DM Sans' }}>
                {' '}for "{query}"
              </span>
            )}
          </div>
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
