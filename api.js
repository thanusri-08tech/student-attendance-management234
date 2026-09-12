import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Normalizes any error thrown by Axios into a plain, user-friendly message.
 * The backend returns errors as { error: true, detail: ... } (see
 * attendance/exceptions.py). This function extracts a readable string from
 * that shape without ever exposing raw stack traces to the user.
 */
export function extractErrorMessage(error) {
  if (error.response) {
    const { detail } = error.response.data || {}

    if (!detail) return 'Something went wrong. Please try again.'

    if (typeof detail === 'string') return detail

    if (typeof detail === 'object') {
      // DRF validation errors look like: { field: ["message"], ... }
      const messages = []
      Object.entries(detail).forEach(([field, value]) => {
        const text = Array.isArray(value) ? value.join(' ') : String(value)
        messages.push(field === 'non_field_errors' ? text : `${field}: ${text}`)
      })
      if (messages.length) return messages.join(' | ')
    }
  }

  if (error.request) {
    return 'Could not reach the server. Please make sure the backend is running at ' + API_BASE_URL
  }

  return 'An unexpected error occurred.'
}

// ---------------------------------------------------------------------------
// Student endpoints
// ---------------------------------------------------------------------------

export const getStudents = (params = {}) => client.get('/students/', { params })
export const getStudent = (id) => client.get(`/students/${id}/`)
export const createStudent = (data) => client.post('/students/', data)
export const updateStudent = (id, data) => client.patch(`/students/${id}/`, data)
export const deleteStudent = (id) => client.delete(`/students/${id}/`)

// ---------------------------------------------------------------------------
// Attendance endpoints
// ---------------------------------------------------------------------------

export const getAttendanceRecords = (params = {}) => client.get('/attendance/', { params })
export const getAttendanceRecord = (id) => client.get(`/attendance/${id}/`)
export const createAttendance = (data) => client.post('/attendance/', data)
export const updateAttendance = (id, data) => client.patch(`/attendance/${id}/`, data)
export const deleteAttendance = (id) => client.delete(`/attendance/${id}/`)

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export const getDashboardStats = () => client.get('/dashboard/')

export default client
