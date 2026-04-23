export default function Stars({ rating }) {
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
