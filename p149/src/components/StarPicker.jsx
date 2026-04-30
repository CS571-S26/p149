import { useState } from 'react'

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function StarPicker({ value, onChange, labelledBy }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="d-flex gap-1 align-items-center flex-wrap star-picker"
    >
      {[1, 2, 3, 4, 5].map(n => {
        const lit = n <= display
        return (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          className={`star-picker-btn${lit ? ' is-lit' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          onKeyDown={e => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault()
              const next = Math.min(5, n + 1)
              onChange(next)
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault()
              const prev = Math.max(1, n - 1)
              onChange(prev)
            }
          }}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <span aria-hidden="true">★</span>
        </button>
        )
      })}
      {value > 0 && (
        <span className="star-picker-caption small text-muted ms-1">{LABELS[value]}</span>
      )}
    </div>
  )
}
