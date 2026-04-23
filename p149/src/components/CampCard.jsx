import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Stars from './Stars'

export default function CampCard({ camp, isSaved, onSave, isCompared, onCompare }) {
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
