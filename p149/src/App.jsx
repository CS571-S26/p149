import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AppNavbar   from './components/AppNavbar'
import AppFooter   from './components/AppFooter'
import SearchPage  from './pages/SearchPage'
import SavedPage   from './pages/SavedPage'
import DetailPage  from './pages/DetailPage'
import ComparePage from './pages/ComparePage'

export default function App() {
  const [saved,       setSaved]       = useState([])
  const [compared,    setCompared]    = useState([])
  const [userReviews, setUserReviews] = useState({}) // { [campId]: [{author, stars, text}] }

  const toggleSave = camp => setSaved(prev =>
    prev.some(s => s.id === camp.id)
      ? prev.filter(s => s.id !== camp.id)
      : [...prev, camp]
  )

  const toggleCompare = camp => setCompared(prev => {
    if (prev.some(c => c.id === camp.id)) return prev.filter(c => c.id !== camp.id)
    if (prev.length >= 3) return prev
    return [...prev, camp]
  })

  const addReview = (campId, review) => {
    setUserReviews(prev => ({
      ...prev,
      [campId]: [review, ...(prev[campId] || [])],
    }))
  }

  return (
    <div>
      <AppNavbar savedCount={saved.length} compareCount={compared.length} />

      <Routes>
        <Route path="/" element={
          <SearchPage
            saved={saved}       onSave={toggleSave}
            compared={compared} onCompare={toggleCompare}
          />
        } />
        <Route path="/saved" element={
          <SavedPage
            saved={saved}       onRemove={toggleSave}
            compared={compared} onCompare={toggleCompare}
          />
        } />
        <Route path="/camp/:id" element={
          <DetailPage
            saved={saved}       onSave={toggleSave}
            compared={compared} onCompare={toggleCompare}
            userReviews={userReviews} onAddReview={addReview}
          />
        } />
        <Route path="/compare" element={
          <ComparePage compared={compared} onRemove={toggleCompare} />
        } />
      </Routes>

      <AppFooter />
    </div>
  )
}
