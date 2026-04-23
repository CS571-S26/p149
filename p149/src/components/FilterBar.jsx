const ALL_TAGS = [
  'Tent', 'RV', 'Family', 'Pet-Friendly', 'Hiking', 'Fishing',
  'Stargazing', 'Wildlife', 'Backcountry', 'Ocean Views', 'Fall Foliage', 'Paddling'
]

export default function FilterBar({ activeTag, onTagClick, query, onClear }) {
  return (
    <div className="d-flex gap-2 flex-wrap mb-4">
      {ALL_TAGS.map(tag => (
        <button
          key={tag}
          className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
      {(query || activeTag) && (
        <button
          className="filter-chip"
          style={{ color: 'var(--ember)', borderColor: 'var(--ember)' }}
          onClick={onClear}
        >
          ✕ Clear
        </button>
      )}
    </div>
  )
}
