import { useState } from 'react'

export default function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div className="d-flex gap-1 align-items-center" style={{ fontSize: '1.6rem', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          style={{
            color: n <= display ? '#e09d2a' : '#ccc',
            transition: 'color 0.12s, transform 0.12s',
            transform: n <= display ? 'scale(1.15)' : 'scale(1)',
            display: 'inline-block',
            userSelect: 'none',
          }}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          title={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </span>
      ))}
      {value > 0 && (
        <span style={{ fontSize: '0.82rem', color: 'var(--smoke)', marginLeft: '6px' }}>
          {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value]}
        </span>
      )}
    </div>
  )
}
