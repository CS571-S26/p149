import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_USERS = 'campfinder-users'
const STORAGE_SESSION = 'campfinder-session'

const AuthContext = createContext(null)

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const register = useCallback((username, email, password) => {
    const u = username.trim()
    const em = email.trim()
    if (u.length < 2) return { error: 'Username must be at least 2 characters.' }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return { error: 'Enter a valid email address.' }
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

    const users = loadUsers()
    if (users.some(x => x.username.toLowerCase() === u.toLowerCase())) {
      return { error: 'That username is already taken.' }
    }
    if (users.some(x => x.email.toLowerCase() === em.toLowerCase())) {
      return { error: 'An account with this email already exists.' }
    }

    const newUser = {
      id: crypto.randomUUID(),
      username: u,
      email: em,
      password,
    }
    users.push(newUser)
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users))

    const session = { id: newUser.id, username: newUser.username, email: newUser.email }
    setUser(session)
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session))
    return { ok: true }
  }, [])

  const login = useCallback((identifier, password) => {
    const id = identifier.trim()
    if (!id || !password) return { error: 'Enter your username or email and password.' }

    const users = loadUsers()
    const found = users.find(
      x =>
        x.username.toLowerCase() === id.toLowerCase() ||
        x.email.toLowerCase() === id.toLowerCase()
    )
    if (!found || found.password !== password) {
      return { error: 'Invalid username or password.' }
    }

    const session = { id: found.id, username: found.username, email: found.email }
    setUser(session)
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session))
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_SESSION)
  }, [])

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
