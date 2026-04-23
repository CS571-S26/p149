import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function AppNavbar({ savedCount, compareCount }) {
  return (
    <Navbar expand="md" className="camp-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <span className="brand-icon">🏕️</span>
          CampRate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-1">
            <Nav.Link as={NavLink} to="/" end>
              Explore
            </Nav.Link>
            <Nav.Link as={NavLink} to="/saved">
              Saved
              {savedCount > 0 && (
                <span className="saved-badge">{savedCount}</span>
              )}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/compare">
              Compare
              {compareCount > 0 && (
                <span className="saved-badge" style={{ background: 'var(--bark)' }}>
                  {compareCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
