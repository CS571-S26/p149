import ReviewCard from './ReviewCard'
import Stars from './Stars'

export default function ReviewList({ staticReviews, userReviews }) {
  const all = [...(userReviews || []), ...(staticReviews || [])]
  const avg = all.length
    ? Math.round((all.reduce((sum, r) => sum + r.stars, 0) / all.length) * 10) / 10
    : null

  return (
    <div>
      {/* Header with count + live average */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div className="section-label" style={{ margin: 0 }}>
          Reviews ({all.length})
        </div>
        {avg !== null && (
          <div className="d-flex align-items-center gap-2">
            <Stars rating={avg} />
            <span style={{ fontSize: '0.8rem', color: 'var(--smoke)' }}>avg</span>
          </div>
        )}
      </div>

      {all.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '30px 0',
          color: 'var(--smoke)',
          fontSize: '0.88rem',
        }}>
          No reviews yet — be the first!
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {all.map((r, i) => (
            <ReviewCard
              key={i}
              review={r}
              isNew={i < (userReviews || []).length}
            />
          ))}
        </div>
      )}
    </div>
  )
}
