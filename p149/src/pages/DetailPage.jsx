import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { campsites } from '../Campsites'
import Stars from '../components/Stars'
import ReviewList from '../components/ReviewList'
import ReviewForm from '../components/ReviewForm'
import { getCampImage } from '../utils/campImages'

export default function DetailPage({ saved, onSave, compared, onCompare, userReviews, onAddReview }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const camp = campsites.find(c => c.id === Number(id))

  if (!camp) return (
    <Container className="py-5 text-center">
      <h2>Campsite not found</h2>
      <Button onClick={() => navigate('/')} className="mt-3">← Back to Explore</Button>
    </Container>
  )

  const isSaved    = saved.some(s => s.id === camp.id)
  const isCompared = compared.some(c => c.id === camp.id)
  const myReviews  = userReviews[camp.id] || []
  const imageUrl = getCampImage(camp)

  return (
    <div>
      <div className="detail-hero">
        <img
          className="detail-hero-image"
          src={imageUrl}
          alt={`Landscape at ${camp.name}`}
          onError={e => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'
          }}
        />
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
                ({camp.reviews + myReviews.length} reviews)
              </span>
              <div className="camp-tags mb-0">
                {camp.tags.map(t => <span key={t} className="camp-tag">{t}</span>)}
              </div>
            </div>
          </Col>
          <Col xs="auto" className="mt-2 d-flex gap-2 flex-wrap">
            <Button
              variant="outline-secondary"
              onClick={() => onCompare(camp)}
              style={{ borderRadius: '50px', padding: '8px 18px', fontSize: '0.85rem' }}
            >
              {isCompared ? '⚖️ In Compare' : '⊕ Compare'}
            </Button>
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
            <ReviewList
              staticReviews={camp.reviews_list}
              userReviews={myReviews}
            />
            <div className="mt-4">
              <ReviewForm campId={camp.id} onSubmit={onAddReview} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
