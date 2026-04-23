import Stars from './Stars'

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="d-flex justify-content-between align-items-center">
        <span className="reviewer">{review.author}</span>
        <Stars rating={review.stars} />
      </div>
      <p className="review-text">{review.text}</p>
    </div>
  )
}
