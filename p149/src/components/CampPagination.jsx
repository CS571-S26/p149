import { Pagination } from 'react-bootstrap'

export default function CampPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="d-flex justify-content-center mt-5">
      <Pagination className="camp-pagination">
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => { onPageChange(page - 1); window.scrollTo(0, 0) }}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={page === i + 1}
            onClick={() => { onPageChange(i + 1); window.scrollTo(0, 0) }}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={page === totalPages}
          onClick={() => { onPageChange(page + 1); window.scrollTo(0, 0) }}
        />
      </Pagination>
    </div>
  )
}
