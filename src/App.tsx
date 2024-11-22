import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './Home'
import StudentDashboard from './dashboard/StudentDashboard'
import LecturerDashboard from './dashboard/LecturerDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import ThesisAppLogo from './assets/ThesisAppLogo.webp'
import FooterComponent from './components/FooterComponent'

function App() {
  return (
    <>
      <Router>
        <NavBar image={ThesisAppLogo} />

        <div className="h-screen">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/student/dashboard' element={<StudentDashboard />} />
            <Route path='/lecturer/dashboard' element={<LecturerDashboard />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
          </Routes>
        </div>

        <FooterComponent />
      </Router>
    </>
  )
}

export default App
