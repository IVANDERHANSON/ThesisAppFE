import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './Home'
import StudentDashboard from './dashboard/StudentDashboard'
import LecturerDashboard from './dashboard/LecturerDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import ThesisAppLogo from './assets/ThesisAppLogo.webp'

function App() {
  return (
    <>
      <Router>
        <NavBar image={ThesisAppLogo} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/student/dashboard' element={<StudentDashboard />} />
          <Route path='/lecturer/dashboard' element={<LecturerDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
