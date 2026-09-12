import { useEffect, useState } from 'react'
import {
  deleteAttendance,
  extractErrorMessage,
  getAttendanceRecords,
  updateAttendance,
} from '../services/api'
import Loading from './Loading'
import SearchFilter from './SearchFilter'

const FILTER_FIELDS = [
  { type: 'date', key: 'date', placeholder: 'Filter by date' },
  { type: 'select', key: 'status', placeholder: 'All Statuses', options: ['Present', 'Absent'] },
]

function AttendanceList({ refreshSignal }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({})
  const [pendingDelete, setPendingDelete] = useState(null)
  const [actionError, setActionError] = useState('')

  const fetchRecords = async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (filters.date) params.date = filters.date
      if (filters.status) params.status = filters.status

      const response = await getAttendanceRecords(params)
      setRecords(response.data.results || response.data)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, refreshSignal])

  const toggleStatus = async (record) => {
    setActionError('')
    const newStatus = record.status === 'Present' ? 'Absent' : 'Present'
    try {
      await updateAttendance(record.id, { status: newStatus })
      fetchRecords()
    } catch (err) {
      setActionError(extractErrorMessage(err))
    }
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    setActionError('')
    try {
      await deleteAttendance(pendingDelete.id)
      setPendingDelete(null)
      fetchRecords()
    } catch (err) {
      setActionError(extractErrorMessage(err))
    }
  }

  return (
    <div>
      <h2>Attendance Records</h2>

      <SearchFilter
        fields={FILTER_FIELDS}
        values={filters}
        onChange={setFilters}
        onClear={() => setFilters({})}
      />

      {error && <div className="alert alert-error">{error}</div>}
      {actionError && <div className="alert alert-error">{actionError}</div>}

      {loading ? (
        <Loading text="Loading attendance records..." />
      ) : records.length === 0 ? (
        <div className="empty-state">No attendance records found for the selected filters.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.roll_no}</td>
                <td>{record.student_name}</td>
                <td>
                  <span className={`badge ${record.status === 'Present' ? 'badge-present' : 'badge-absent'}`}>
                    {record.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn btn-small btn-edit" onClick={() => toggleStatus(record)}>
                    Mark {record.status === 'Present' ? 'Absent' : 'Present'}
                  </button>
                  <button className="btn btn-small btn-delete" onClick={() => setPendingDelete(record)}>Delete</button>
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
              Delete the attendance record for <strong>{pendingDelete.student_name}</strong> on{' '}
              <strong>{pendingDelete.date}</strong>? This action cannot be undone.
            </p>
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

export default AttendanceList
