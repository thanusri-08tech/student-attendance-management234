import { useEffect, useState } from 'react'
import { extractErrorMessage, getDashboardStats } from '../services/api'
import Loading from './Loading'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getDashboardStats()
      setStats(response.data)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) return <Loading text="Loading dashboard..." />
  if (error) return <div className="alert alert-error">{error}</div>
  if (!stats) return null

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total_students}</span>
          <span className="stat-label">Total Students</span>
        </div>
        <div className="stat-card stat-present">
          <span className="stat-value">{stats.present_count}</span>
          <span className="stat-label">Present</span>
        </div>
        <div className="stat-card stat-absent">
          <span className="stat-value">{stats.absent_count}</span>
          <span className="stat-label">Absent</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.attendance_percentage}%</span>
          <span className="stat-label">Attendance Rate</span>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={fetchStats}>Refresh</button>
    </div>
  )
}

export default Dashboard
