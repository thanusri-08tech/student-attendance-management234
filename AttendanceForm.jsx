import { useEffect, useState } from 'react'
import { createAttendance, extractErrorMessage, getStudents } from '../services/api'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function AttendanceForm({ onSaved }) {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState('')
  const [date, setDate] = useState(todayISO())
  const [attendanceStatus, setAttendanceStatus] = useState('Present')
  const [fieldErrors, setFieldErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await getStudents()
        setStudents(response.data.results || response.data)
      } catch (err) {
        setServerError(extractErrorMessage(err))
      }
    }
    loadStudents()
  }, [])

  const validate = () => {
    const errors = {}
    if (!studentId) errors.studentId = 'Please select a student.'
    if (!date) errors.date = 'Please select a date.'
    if (!['Present', 'Absent'].includes(attendanceStatus)) {
      errors.status = 'Status must be Present or Absent.'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    setSuccessMessage('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    try {
      await createAttendance({ student: Number(studentId), date, status: attendanceStatus })
      setSuccessMessage('Attendance recorded successfully.')
      onSaved()
    } catch (err) {
      setServerError(extractErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-card">
      <h2>Mark Attendance</h2>

      {serverError && <div className="alert alert-error">{serverError}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {students.length === 0 ? (
        <div className="empty-state">No students available. Add a student first.</div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="student">Student</label>
            <select id="student" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
              <option value="">-- Select Student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.roll_no})</option>
              ))}
            </select>
            {fieldErrors.studentId && <span className="field-error">{fieldErrors.studentId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            {fieldErrors.date && <span className="field-error">{fieldErrors.date}</span>}
          </div>

          <div className="form-group">
            <label>Status</label>
            <div className="status-toggle">
              <button
                type="button"
                className={`btn btn-present ${attendanceStatus === 'Present' ? 'selected' : ''}`}
                onClick={() => setAttendanceStatus('Present')}
              >
                Present
              </button>
              <button
                type="button"
                className={`btn btn-absent ${attendanceStatus === 'Absent' ? 'selected' : ''}`}
                onClick={() => setAttendanceStatus('Absent')}
              >
                Absent
              </button>
            </div>
            {fieldErrors.status && <span className="field-error">{fieldErrors.status}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Attendance'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AttendanceForm
