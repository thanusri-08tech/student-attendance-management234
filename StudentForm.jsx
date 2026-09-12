import { useEffect, useState } from 'react'
import { createStudent, extractErrorMessage, updateStudent } from '../services/api'

const EMPTY_FORM = {
  name: '',
  roll_no: '',
  department: '',
  email: '',
  year: '',
  section: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function StudentForm({ editingStudent, onSaved, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        roll_no: editingStudent.roll_no,
        department: editingStudent.department,
        email: editingStudent.email,
        year: String(editingStudent.year),
        section: editingStudent.section,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setFieldErrors({})
    setServerError('')
    setSuccessMessage('')
  }, [editingStudent])

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required.'
    if (!form.roll_no.trim()) errors.roll_no = 'Roll number is required.'
    if (!form.department.trim()) errors.department = 'Department is required.'
    if (!form.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
    if (!form.year) {
      errors.year = 'Year is required.'
    } else if (Number(form.year) < 1 || Number(form.year) > 6) {
      errors.year = 'Year must be between 1 and 6.'
    }
    if (!form.section.trim()) errors.section = 'Section is required.'
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    setSuccessMessage('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    const payload = { ...form, year: Number(form.year) }

    setSubmitting(true)
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, payload)
        setSuccessMessage('Student updated successfully.')
      } else {
        await createStudent(payload)
        setSuccessMessage('Student added successfully.')
        setForm(EMPTY_FORM)
      }
      onSaved()
    } catch (err) {
      setServerError(extractErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-card">
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>

      {serverError && <div className="alert alert-error">{serverError}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="roll_no">Roll Number</label>
          <input id="roll_no" name="roll_no" value={form.roll_no} onChange={handleChange} />
          {fieldErrors.roll_no && <span className="field-error">{fieldErrors.roll_no}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input id="department" name="department" value={form.department} onChange={handleChange} />
          {fieldErrors.department && <span className="field-error">{fieldErrors.department}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input id="year" name="year" type="number" min="1" max="6" value={form.year} onChange={handleChange} />
            {fieldErrors.year && <span className="field-error">{fieldErrors.year}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="section">Section</label>
            <input id="section" name="section" value={form.section} onChange={handleChange} />
            {fieldErrors.section && <span className="field-error">{fieldErrors.section}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default StudentForm
