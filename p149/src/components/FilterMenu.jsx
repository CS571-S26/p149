import { useEffect, useState } from 'react'
import { Card, Button, Collapse, Form } from 'react-bootstrap'

const USEFUL_TAGS = [
  'Tent',
  'RV',
  'Family',
  'Pet-Friendly',
  'Hiking',
  'Fishing',
  'Stargazing',
  'Ocean Views',
]

export default function FilterMenu({ show, onToggle, filters, onApply, onClear, allTags, activeFilterCount }) {
  const [draft, setDraft] = useState(filters)

  useEffect(() => {
    if (show) setDraft(filters)
  }, [show, filters])

  const toggleTag = tag => {
    setDraft(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  const visibleTags = USEFUL_TAGS.filter(tag => allTags.includes(tag))

  return (
    <div className="mb-3">
      <Button variant="outline-primary" className="rounded-pill" onClick={onToggle} aria-expanded={show}>
        {show ? 'Hide filters' : 'Filter menu'} {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
      </Button>
      <Collapse in={show}>
        <div>
          <Card className="mt-3 border-0 shadow-sm">
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Quick tags</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  {visibleTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`filter-chip ${draft.tags.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleTag(tag)}
                      aria-pressed={draft.tags.includes(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-4" controlId="filter-max-price">
                <Form.Label className="fw-semibold">Maximum price: ${draft.maxPrice}/night</Form.Label>
                <Form.Range
                  min={10}
                  max={40}
                  step={1}
                  value={draft.maxPrice}
                  onChange={e => setDraft(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="filter-min-sites">
                <Form.Label className="fw-semibold">Minimum number of sites: {draft.minSites}</Form.Label>
                <Form.Range
                  min={5}
                  max={100}
                  step={5}
                  value={draft.minSites}
                  onChange={e => setDraft(prev => ({ ...prev, minSites: Number(e.target.value) }))}
                />
              </Form.Group>

              <Form.Group controlId="filter-min-rating">
                <Form.Label className="fw-semibold">Minimum rating: {draft.minRating.toFixed(1)}</Form.Label>
                <Form.Range
                  min={0}
                  max={5}
                  step={0.5}
                  value={draft.minRating}
                  onChange={e => setDraft(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer className="bg-white d-flex justify-content-end gap-2">
        <Button
          variant="outline-secondary"
          onClick={() => {
            onClear()
            setDraft({
              tags: [],
              maxPrice: 40,
              minSites: 5,
              minRating: 0,
            })
          }}
        >
          Clear filters
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onApply(draft)
          }}
        >
          Apply filters
        </Button>
            </Card.Footer>
          </Card>
        </div>
      </Collapse>
    </div>
  )
}
