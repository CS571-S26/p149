import Stars from './Stars'

export default function ReviewCard({ review, isNew }) {
  return (
    <div
      className="review-card"
      style={isNew ? { borderColor: 'var(--moss)', borderWidth: '1.5px' } : {}}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span className="reviewer">{review.author}</span>
          {isNew && (
            <span style={{
              background: 'var(--moss)',
              color: 'white',
              fontSize: '0.65rem',
              padding: '1px 7px',
              borderRadius: '20px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              New
            </span>
          )}
        </div>
        <Stars rating={review.stars} />
      </div>
      <p className="review-text">{review.text}</p>
    </div>
  )
}
