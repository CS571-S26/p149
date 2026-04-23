import { useState } from 'react'
import { Button } from 'react-bootstrap'
import StarPicker from './StarPicker'

export default function ReviewForm({ campId, onSubmit }) {
  const [author, setAuthor]   = useState('')
  const [stars,  setStars]    = useState(0)
  const [text,   setText]     = useState('')
  const [error,  setError]    = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (!author.trim()) return setError('Please enter your name.')
    if (stars === 0)    return setError('Please select a star rating.')
    if (text.trim().length < 10) return setError('Review must be at least 10 characters.')

    onSubmit(campId, { author: author.trim(), stars, text: text.trim() })
    setAuthor('')
    setStars(0)
    setText('')
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3500)
  }

  return (
    <div style={{
      background: 'var(--sand)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '22px 24px',
      marginTop: '8px',
    }}>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.05rem',
        color: 'var(--forest)',
        fontWeight: 700,
        marginBottom: '16px',
      }}>
        ✍️ Leave a Review
      </div>

      {success && (
        <div style={{
          background: 'var(--moss)',
          color: 'white',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '0.88rem',
          marginBottom: '14px',
        }}>
          ✓ Your review was posted! Thanks for sharing.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--smoke)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>
            Your Name
          </label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="e.g. TrailDog92"
            maxLength={40}
            style={{
              width: '100%',
              border: '1.5px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.9rem',
              fontFamily: 'DM Sans, sans-serif',
              outline: 'none',
              background: 'white',
              color: 'var(--charcoal)',
            }}
          />
        </div>

        <div className="mb-3">
          <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--smoke)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Your Rating
          </label>
          <StarPicker value={stars} onChange={setStars} />
        </div>

        <div className="mb-3">
          <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--smoke)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>
            Your Review
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Tell others what made this campsite special (or not)…"
            rows={4}
            maxLength={600}
            style={{
              width: '100%',
              border: '1.5px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.88rem',
              fontFamily: 'DM Sans, sans-serif',
              resize: 'vertical',
              outline: 'none',
              background: 'white',
              color: 'var(--charcoal)',
              lineHeight: 1.55,
            }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--smoke)', textAlign: 'right', marginTop: '3px' }}>
            {text.length} / 600
          </div>
        </div>

        {error && (
          <div style={{ color: 'var(--ember)', fontSize: '0.83rem', marginBottom: '10px' }}>
            ⚠ {error}
          </div>
        )}

        <Button type="submit" variant="primary" style={{ borderRadius: '50px', padding: '8px 24px' }}>
          Post Review
        </Button>
      </form>
    </div>
  )
}
