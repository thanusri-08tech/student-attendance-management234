import { useState } from 'react'
import AttendanceForm from './components/AttendanceForm'
import AttendanceList from './components/AttendanceList'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingStudent, setEditingStudent] = useState(null)
  const [studentRefreshSignal, setStudentRefreshSignal] = useState(0)
  const [attendanceRefreshSignal, setAttendanceRefreshSignal] = useState(0)

  const handleTabChange = (tab) => {
    setEditingStudent(null)
    setActiveTab(tab)
  }

  const handleStudentSaved = () => {
    setEditingStudent(null)
    setStudentRefreshSignal((prev) => prev + 1)
    setActiveTab('students')
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setActiveTab('students')
  }

  const handleAttendanceSaved = () => {
    setAttendanceRefreshSignal((prev) => prev + 1)
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}

        {activeTab === 'students' && (
          <div className="two-column">
            <div>
              <StudentForm
                editingStudent={editingStudent}
                onSaved={handleStudentSaved}
                onCancel={() => setEditingStudent(null)}
              />
            </div>
            <div>
              <StudentList onEdit={handleEditStudent} refreshSignal={studentRefreshSignal} />
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <AttendanceForm onSaved={handleAttendanceSaved} />
        )}

        {activeTab === 'attendance-records' && (
          <AttendanceList refreshSignal={attendanceRefreshSignal} />
        )}
      </main>

      <footer className="footer">
        Student Attendance Management System &mdash; College Project Demonstration
      </footer>
    </div>
  )
}

export default App
