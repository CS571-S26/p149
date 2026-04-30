import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Alert, Form } from 'react-bootstrap'
import StarPicker from './StarPicker'
import { useAuth } from '../context/AuthContext'

export default function ReviewForm({ campId, onSubmit }) {
  const { user } = useAuth()
  const location = useLocation()
  const [stars, setStars] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (!user) return
    if (stars === 0) return setError('Please select a star rating.')
    if (text.trim().length < 10) return setError('Review must be at least 10 characters.')

    onSubmit(campId, { author: user.username, stars, text: text.trim() })
    setStars(0)
    setText('')
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3500)
  }

  if (!user) {
    return (
      <div
        style={{
          background: 'var(--sand)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '22px 24px',
          marginTop: '8px',
        }}
      >
        <h3 className="h6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--forest)', fontWeight: 700 }}>
          Write a review
        </h3>
        <p className="text-muted small mb-3">
          Log in to add your rating and notes for this place. Reviews are saved in this browser only.
        </p>
        <Button as={Link} to="/login" state={{ from: location }} variant="primary" className="rounded-pill me-2">
          Log in
        </Button>
        <Button as={Link} to="/register" state={{ from: location }} variant="outline-primary" className="rounded-pill">
          Register
        </Button>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--sand)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '22px 24px',
        marginTop: '8px',
      }}
    >
      <h3 className="h6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--forest)', fontWeight: 700, marginBottom: '16px' }}>
        Write a review
      </h3>
      <p className="small text-muted mb-3">
        Posting as <strong>{user.username}</strong>.
      </p>

      {success && (
        <Alert variant="success" className="py-2 small mb-3">
          Review posted.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label id="review-rating-label" className="small text-uppercase text-muted fw-medium">
            Rating
          </Form.Label>
          <StarPicker value={stars} onChange={setStars} labelledBy="review-rating-label" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="review-text">
          <Form.Label className="small text-uppercase text-muted fw-medium">Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Trail conditions, crowds, water sources, what worked for you…"
            maxLength={600}
            style={{ fontSize: '0.88rem', lineHeight: 1.55 }}
          />
          <Form.Text className="text-end d-block">{text.length} / 600</Form.Text>
        </Form.Group>

        {error && (
          <p className="text-danger small mb-3" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" style={{ borderRadius: '50px', padding: '8px 24px' }}>
          Post review
        </Button>
      </Form>
    </div>
  )
}
