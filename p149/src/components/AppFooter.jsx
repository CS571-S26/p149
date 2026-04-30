import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { campsites } from '../Campsites'

export default function AppFooter() {
  const totalReviews = campsites.reduce((sum, c) => sum + c.reviews, 0)
  const states = new Set(campsites.map(c => c.state)).size
  const avgRating = (
    campsites.reduce((sum, c) => sum + c.rating, 0) / campsites.length
  ).toFixed(1)

  return (
    <footer style={{
      background: 'var(--forest)',
      color: 'rgba(245,240,232,0.92)',
      marginTop: '60px',
      paddingTop: '48px',
      paddingBottom: '28px',
    }}>
      <Container>
        <Row className="g-4 mb-4">
          <Col md={4}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.4rem',
              color: 'var(--sand)',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span aria-hidden="true">🏕️</span> Campfinder
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, maxWidth: '260px' }}>
              Compare frontcountry and backcountry camps you can use as a base for day hikes and longer trips.
            </p>
          </Col>

          <Col md={3}>
            <div style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(245,240,232,0.88)',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              Explore
            </div>
            <div className="d-flex flex-column gap-2">
              {[
                { to: '/',        label: 'Browse Campsites' },
                { to: '/saved',   label: 'Saved Camps' },
                { to: '/compare', label: 'Compare Campsites' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--sand)' : 'rgba(245,240,232,0.9)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'color 0.15s',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </Col>

          <Col md={5}>
            <div style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(245,240,232,0.88)',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              By the Numbers
            </div>
            <div className="d-flex gap-3 flex-wrap">
              {[
                { value: campsites.length,             label: 'Campsites' },
                { value: states,                       label: 'States' },
                { value: totalReviews.toLocaleString(), label: 'Reviews' },
                { value: avgRating + ' ★',             label: 'Avg Rating' },
              ].map(({ value, label }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  minWidth: '80px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.3rem',
                    color: 'var(--sand)',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.72rem', marginTop: '4px', letterSpacing: '0.04em' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.78rem',
          color: 'rgba(245,240,232,0.82)',
        }}>
          <span>© {new Date().getFullYear()} Campfinder</span>
          <span>CS571 demo — client-side only</span>
        </div>
      </Container>
    </footer>
  )
}
