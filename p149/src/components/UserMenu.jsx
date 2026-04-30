import { Link } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

export default function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <>
        <Nav.Item>
          <Nav.Link as={Link} to="/login">
            Log in
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/register" className="text-nowrap">
            Register
          </Nav.Link>
        </Nav.Item>
      </>
    )
  }

  return (
    <NavDropdown
      title={user.username}
      id="user-nav-dropdown"
      align="end"
      className="camp-nav-user"
    >
      <NavDropdown.ItemText className="text-muted small">
        {user.email}
      </NavDropdown.ItemText>
      <NavDropdown.Divider />
      <NavDropdown.Item as="button" type="button" onClick={logout}>
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  )
}
