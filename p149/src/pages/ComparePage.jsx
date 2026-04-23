import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Stars from '../components/Stars'

function CompareCell({ value, highlight }) {
  return (
    <div style={{
      padding: '10px 12px',
      borderRadius: '8px',
      background: highlight ? 'rgba(74,124,78,0.12)' : 'transparent',
      fontWeight: highlight ? '600' : '400',
      color: highlight ? 'var(--forest)' : 'var(--smoke)',
      fontSize: '0.9rem',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {value}
    </div>
  )
}

const ROW_LABELS = [
  { key: 'location',  label: 'Location' },
  { key: 'price',     label: 'Price / Night' },
  { key: 'elevation', label: 'Elevation' },
  { key: 'sites',     label: '# of Sites' },
  { key: 'rating',    label: 'Rating' },
  { key: 'tags',      label: 'Type' },
  { key: 'amenities', label: 'Amenities' },
]

export default function ComparePage({ compared, onRemove }) {
  const navigate = useNavigate()

  if (compared.length === 0) {
    return (
      <Container className="py-5">
        <div className="section-label">Side-by-Side</div>
        <h2 className="section-title mb-4">Compare Campsites</h2>
        <div className="saved-empty">
          <div className="empty-icon">⚖️</div>
          <h3>Nothing to compare yet</h3>
          <p>
            Hit the <strong>⊕</strong> button on any campsite card or detail page to add it here.
            You can compare up to 3 campsites side by side.
          </p>
          <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
            Browse Campsites
          </Button>
        </div>
      </Container>
    )
  }

  // Find best rating for highlight
  const bestRating = Math.max(...compared.map(c => c.rating))
  // Find lowest price (strip non-numeric)
  const prices = compared.map(c => parseFloat(c.price.replace(/[^0-9.]/g, '')))
  const lowestPrice = Math.min(...prices)

  return (
    <Container className="py-5">
      <div className="section-label">Side-by-Side</div>
      <h2 className="section-title mb-2">Compare Campsites</h2>
      <p style={{ color: 'var(--smoke)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Comparing {compared.length} campsite{compared.length > 1 ? 's' : ''}.
        Green highlights indicate the best value in each category.
      </p>

      {/* Header row — camp icons & names */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `160px repeat(${compared.length}, 1fr)`,
          gap: '12px',
          marginBottom: '8px',
        }}
      >
        <div />
        {compared.map(camp => (
          <div key={camp.id} style={{ textAlign: 'center' }}>
            <div
              style={{
                background: camp.gradient,
                borderRadius: '14px',
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                marginBottom: '10px',
                position: 'relative',
              }}
            >
              {camp.icon}
              <button
                onClick={() => onRemove(camp)}
                title="Remove from compare"
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.35)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  width: '22px',
                  height: '22px',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                color: 'var(--forest)',
                fontSize: '0.95rem',
                lineHeight: 1.3,
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/camp/${camp.id}`)}
            >
              {camp.name}
            </div>
          </div>
        ))}
      </div>

      {/* Data rows */}
      {ROW_LABELS.map(({ key, label }, rowIdx) => (
        <div
          key={key}
          style={{
            display: 'grid',
            gridTemplateColumns: `160px repeat(${compared.length}, 1fr)`,
            gap: '12px',
            marginBottom: '4px',
            background: rowIdx % 2 === 0 ? 'var(--sand)' : 'transparent',
            borderRadius: '10px',
            padding: '4px 0',
          }}
        >
          {/* Row label */}
          <div style={{
            padding: '10px 12px',
            fontSize: '0.78rem',
            color: 'var(--smoke)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
          }}>
            {label}
          </div>

          {/* Values per camp */}
          {compared.map((camp, ci) => {
            let displayVal
            let highlight = false

            if (key === 'tags') {
              displayVal = camp.tags.join(', ')
            } else if (key === 'amenities') {
              displayVal = camp.amenities.join(', ')
            } else if (key === 'rating') {
              displayVal = <Stars rating={camp.rating} />
              highlight = camp.rating === bestRating
            } else if (key === 'price') {
              displayVal = camp.price
              highlight = prices[ci] === lowestPrice
            } else {
              displayVal = String(camp[key])
            }

            return (
              <CompareCell key={camp.id} value={displayVal} highlight={highlight} />
            )
          })}
        </div>
      ))}

      <div className="d-flex gap-2 mt-4 flex-wrap">
        <Button variant="outline-secondary" onClick={() => navigate('/')} style={{ borderRadius: '50px' }}>
          + Add More
        </Button>
        {compared.map(c => (
          <Button
            key={c.id}
            variant="primary"
            onClick={() => navigate(`/camp/${c.id}`)}
            style={{ borderRadius: '50px' }}
          >
            View {c.name.split(' ')[0]}…
          </Button>
        ))}
      </div>
    </Container>
  )
}
