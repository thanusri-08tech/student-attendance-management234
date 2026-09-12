import { useEffect, useState } from 'react'
import { deleteStudent, extractErrorMessage, getStudents } from '../services/api'
import Loading from './Loading'
import SearchFilter from './SearchFilter'

const FILTER_FIELDS = [
  { type: 'search', key: 'search', placeholder: 'Search by name or roll no...' },
  { type: 'text', key: 'department', placeholder: 'Filter by department' },
  { type: 'text', key: 'section', placeholder: 'Filter by section' },
  { type: 'select', key: 'year', placeholder: 'All Years', options: ['1', '2', '3', '4', '5', '6'] },
]

function StudentList({ onEdit, refreshSignal }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({})
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const fetchStudents = async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (filters.search) params.search = filters.search
      if (filters.department) params.department = filters.department
      if (filters.section) params.section = filters.section
      if (filters.year) params.year = filters.year

      const response = await getStudents(params)
      const data = response.data.results || response.data
      setStudents(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, refreshSignal])

  const confirmDelete = async () => {
    if (!pendingDelete) return
    setDeleteError('')
    try {
      await deleteStudent(pendingDelete.id)
      setPendingDelete(null)
      fetchStudents()
    } catch (err) {
      setDeleteError(extractErrorMessage(err))
    }
  }

  return (
    <div>
      <h2>Student List</h2>

      <SearchFilter
        fields={FILTER_FIELDS}
        values={filters}
        onChange={setFilters}
        onClear={() => setFilters({})}
      />

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <Loading text="Loading students..." />
      ) : students.length === 0 ? (
        <div className="empty-state">No students found. Try adding one or adjusting your filters.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Section</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.roll_no}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.section}</td>
                <td>{student.email}</td>
                <td className="actions-cell">
                  <button className="btn btn-small btn-edit" onClick={() => onEdit(student)}>Edit</button>
                  <button className="btn btn-small btn-delete" onClick={() => setPendingDelete(student)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pendingDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete <strong>{pendingDelete.name}</strong> ({pendingDelete.roll_no})?
              This will also delete all of their attendance records. This action cannot be undone.
            </p>
            {deleteError && <div className="alert alert-error">{deleteError}</div>}
            <div className="form-actions">
              <button className="btn btn-delete" onClick={confirmDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setPendingDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentList
