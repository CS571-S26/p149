import { Container, Row, Col } from 'react-bootstrap'
import CampCard from '../components/CampCard'

export default function SavedPage({ saved, onRemove, compared, onCompare }) {
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
                isCompared={compared.some(c => c.id === camp.id)}
                onCompare={onCompare}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}
