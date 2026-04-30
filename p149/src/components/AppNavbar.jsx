import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import UserMenu from './UserMenu'

export default function AppNavbar({ savedCount, compareCount }) {
  return (
    <Navbar expand="md" className="camp-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <span className="brand-icon" aria-hidden="true">🏕️</span>
          HikeBench
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-1 align-items-md-center">
            <Nav.Link as={NavLink} to="/" end>
              Browse
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
            <UserMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
