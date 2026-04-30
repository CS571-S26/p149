import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Modal, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

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
      <NavDropdown.Item as="button" type="button" onClick={() => setShowSignOutConfirm(true)}>
        Log out
      </NavDropdown.Item>
      <Modal
        show={showSignOutConfirm}
        onHide={() => setShowSignOutConfirm(false)}
        centered
        aria-labelledby="signout-confirm-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="signout-confirm-title">Sign out?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will be signed out of this browser session.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowSignOutConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              logout()
              setShowSignOutConfirm(false)
            }}
          >
            Sign out
          </Button>
        </Modal.Footer>
      </Modal>
    </NavDropdown>
  )
}
