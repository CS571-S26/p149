import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    const result = register(username, email, password)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <div className="section-label">Account</div>
          <h1 className="section-title mb-4">Create an account</h1>
          <Card className="border-0 shadow-sm" style={{ border: '1px solid var(--border) !important' }}>
            <Card.Body className="p-4">
              <p className="text-muted small mb-4">
                Choose a username and password. Data stays in your browser only; do not reuse a real password you use elsewhere.
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="register-username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    minLength={2}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="register-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="register-password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Form.Text className="text-muted">At least 6 characters.</Form.Text>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 rounded-pill py-2">
                  Register
                </Button>
              </Form>
              <p className="text-center text-muted small mt-4 mb-0">
                Already have an account?{' '}
                <Link to="/login">Log in</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
