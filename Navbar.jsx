const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'students', label: 'Students' },
  { id: 'attendance', label: 'Mark Attendance' },
  { id: 'attendance-records', label: 'Attendance Records' },
]

function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">📋 Student Attendance System</div>
      <div className="navbar-links">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`navbar-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
