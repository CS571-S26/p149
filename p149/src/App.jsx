import { useState, useMemo } from 'react'
import { Routes, Route, NavLink, useNavigate, useParams } from 'react-router-dom'
import {
  Container, Row, Col, Navbar, Nav,
  Button, Pagination, Card
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { campsites } from './campsites'

const SITES_PER_PAGE = 5

/* ── Shared saved state — lifted to App, passed via props ── */

/* ── Star display ─────────────────────────── */
function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < full ? '★' : i === full && half ? '½' : '☆'}
        </span>
      ))}
      <span className="rating-num">{rating}</span>
    </span>
  )
}

/* ── Camp Card ────────────────────────────── */
function CampCard({ camp, isSaved, onSave }) {
  const navigate = useNavigate()
  return (
    <Card className="camp-card" onClick={() => navigate(`/camp/${camp.id}`)}>
      <div className="card-img-placeholder" style={{ background: camp.gradient }}>
        <span>{camp.icon}</span>
      </div>
      <Card.Body>
        <div className="card-title">{camp.name}</div>
        <div className="camp-location">
          <span>📍</span> {camp.location}
        </div>
        <div className="camp-tags">
          {camp.tags.map(t => (
            <span key={t} className="camp-tag">{t}</span>
          ))}
        </div>
        <p className="camp-desc">{camp.description}</p>
        <div className="card-footer-row">
          <Stars rating={camp.rating} />
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '0.82rem', color: 'var(--smoke)' }}>
              {camp.price}
            </span>
            <button
              className={`save-btn ${isSaved ? 'saved' : ''}`}
              title={isSaved ? 'Remove from saved' : 'Save campsite'}
              onClick={e => { e.stopPropagation(); onSave(camp) }}
            >
              {isSaved ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

/* ── Detail Page  /camp/:id ───────────────── */
function DetailPage({ saved, onSave }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const camp = campsites.find(c => c.id === Number(id))

  if (!camp) return (
    <Container className="py-5 text-center">
      <h2>Campsite not found</h2>
      <Button onClick={() => navigate('/')} className="mt-3">← Back to Explore</Button>
    </Container>
  )

  const isSaved = saved.some(s => s.id === camp.id)

  return (
    <div>
      <div className="detail-hero" style={{ background: camp.gradient }}>
        <span style={{ position: 'relative', zIndex: 1, fontSize: '5rem' }}>{camp.icon}</span>
        <div className="detail-overlay" />
      </div>

      <Container className="py-4">
        <button className="detail-back-btn btn" onClick={() => navigate(-1)}>
          ← Back to results
        </button>

        <Row className="mt-3 mb-2 align-items-start">
          <Col>
            <div className="section-label">{camp.location}</div>
            <h1 className="detail-title">{camp.name}</h1>
            <div className="d-flex align-items-center gap-3 mt-2 flex-wrap">
              <Stars rating={camp.rating} />
              <span style={{ fontSize: '0.85rem', color: 'var(--smoke)' }}>
                ({camp.reviews} reviews)
              </span>
              <div className="camp-tags mb-0">
                {camp.tags.map(t => <span key={t} className="camp-tag">{t}</span>)}
              </div>
            </div>
          </Col>
          <Col xs="auto" className="mt-2">
            <Button
              variant={isSaved ? 'danger' : 'primary'}
              onClick={() => onSave(camp)}
              style={{ borderRadius: '50px', padding: '8px 22px' }}
            >
              {isSaved ? '♥ Saved' : '♡ Save Camp'}
            </Button>
          </Col>
        </Row>

        <Row className="g-3 my-3">
          {[
            { label: 'Price',     value: camp.price },
            { label: 'Elevation', value: camp.elevation },
            { label: 'Sites',     value: camp.sites },
            { label: 'Rating',    value: `${camp.rating} / 5` },
          ].map(m => (
            <Col key={m.label} xs={6} sm={3}>
              <div className="detail-meta-item">
                <div className="meta-label">{m.label}</div>
                <div className="meta-value">{m.value}</div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          <Col md={7}>
            <div className="section-label mb-1">About</div>
            <p style={{ color: 'var(--smoke)', lineHeight: 1.7 }}>{camp.description}</p>
            <div className="section-label mt-4 mb-2">Amenities</div>
            <div className="camp-tags">
              {camp.amenities.map(a => (
                <span key={a} className="camp-tag">{a}</span>
              ))}
            </div>
          </Col>
          <Col md={5}>
            <div className="section-label mb-2">Recent Reviews</div>
            <div className="d-flex flex-column gap-3">
              {camp.reviews_list.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="reviewer">{r.author}</span>
                    <Stars rating={r.stars} />
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

/* ── Saved Page  /saved ───────────────────── */
function SavedPage({ saved, onRemove }) {
  return (
    <Container className="py-5">
      <div className="section-label">Your Collection</div>
      <h2 className="section-title mb-4">Saved Campsites</h2>

      {saved.length === 0 ? (
        <div className="saved-empty">
          <div className="empty-icon">🏕️</div>
          <h3>No saved camps yet</h3>
          <p>Hit the ♡ button on any campsite card to save it here.</p>
        </div>
      ) : (
        <Row className="g-4">
          {saved.map(camp => (
            <Col key={camp.id} sm={6} lg={4}>
              <CampCard
                camp={camp}
                isSaved={true}
                onSave={onRemove}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

/* ── Search Page  / ───────────────────────── */
const ALL_TAGS = ['Tent', 'RV', 'Family', 'Pet-Friendly', 'Hiking', 'Fishing',
  'Stargazing', 'Wildlife', 'Backcountry', 'Ocean Views', 'Fall Foliage', 'Paddling']

function SearchPage({ saved, onSave }) {
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
  const handleTag    = tag => { setTag(prev => prev === tag ? null : tag); setPage(1) }

  return (
    <>
      <div className="hero-section">
        <Container>
          <h1>Find Your Perfect<br /><em>Wild Place</em></h1>
          <p className="mt-2 mb-4">
            Explore {campsites.length} curated campsites across America — rated by real adventurers.
          </p>
          <form className="search-bar" onSubmit={handleSearch}>
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

      <Container className="py-4">
        <div className="d-flex gap-2 flex-wrap mb-4">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTag(tag)}
            >
              {tag}
            </button>
          ))}
          {(query || activeTag) && (
            <button
              className="filter-chip"
              style={{ color: 'var(--ember)', borderColor: 'var(--ember)' }}
              onClick={() => { setQuery(''); setInput(''); setTag(null); setPage(1) }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-title" style={{ fontSize: '1.15rem' }}>
            {filtered.length} {filtered.length === 1 ? 'campsite' : 'campsites'} found
            {query && <span style={{ color: 'var(--smoke)', fontSize: '0.95rem', fontFamily: 'DM Sans' }}> for "{query}"</span>}
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
                />
              </Col>
            ))}
          </Row>
        )}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination className="camp-pagination">
              <Pagination.Prev disabled={page === 1} onClick={() => setPage(p => p - 1)} />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={page === i + 1}
                  onClick={() => { setPage(i + 1); window.scrollTo(0, 0) }}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={page === totalPages} onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0) }} />
            </Pagination>
          </div>
        )}
      </Container>
    </>
  )
}

/* ── Root App ─────────────────────────────── */
export default function App() {
  const [saved, setSaved] = useState([])

  const toggleSave = camp => setSaved(prev =>
    prev.some(s => s.id === camp.id)
      ? prev.filter(s => s.id !== camp.id)
      : [...prev, camp]
  )

  return (
    <div>
      {/* Navbar */}
      <Navbar expand="md" className="camp-navbar">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <span className="brand-icon">🏕️</span>
            CampRate
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto gap-1">
              <Nav.Link as={NavLink} to="/" end>
                Explore
              </Nav.Link>
              <Nav.Link as={NavLink} to="/saved">
                Saved
                {saved.length > 0 && (
                  <span className="saved-badge">{saved.length}</span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/"         element={<SearchPage saved={saved} onSave={toggleSave} />} />
        <Route path="/saved"    element={<SavedPage  saved={saved} onRemove={toggleSave} />} />
        <Route path="/camp/:id" element={<DetailPage saved={saved} onSave={toggleSave} />} />
      </Routes>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px 0',
        textAlign: 'center',
        color: 'var(--smoke)',
        fontSize: '0.83rem',
        marginTop: '40px',
      }}>
        🏕️ CampRate — Find your wild place
      </footer>
    </div>
  )
}