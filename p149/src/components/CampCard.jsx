import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Stars from './Stars'
import { getCampImage } from '../utils/campImages'

export default function CampCard({ camp, isSaved, onSave, isCompared, onCompare }) {
  const navigate = useNavigate()
  const imageUrl = getCampImage(camp)

  return (
    <Card className="camp-card" onClick={() => navigate(`/camp/${camp.id}`)}>
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={`Scenery near ${camp.name}`}
        onError={e => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1400&q=80'
        }}
      />
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
            {onCompare && (
              <button
                className={`save-btn ${isCompared ? 'saved' : ''}`}
                title={isCompared ? 'Remove from compare' : 'Add to compare'}
                style={isCompared ? { background: 'var(--bark) !important' } : {}}
                onClick={e => { e.stopPropagation(); onCompare(camp) }}
              >
                {isCompared ? '⚖️' : '⊕'}
              </button>
            )}
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
