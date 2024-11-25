import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './page/Home'
import StudentDashboard from './page/dashboard/StudentDashboard'
import LecturerDashboard from './page/dashboard/LecturerDashboard'
import AdminDashboard from './page/dashboard/AdminDashboard'
import ThesisAppLogo from './assets/ThesisAppLogo.webp'
import FooterComponent from './components/FooterComponent'
import PreThesisPage from './page/PreThesisPage'
import ThesisPage from './page/ThesisPage'
import NotFoundPage from './page/NotFoundPage'

function App() {
  return (
    <>
      <Router>
        <NavBar image={ThesisAppLogo} />

        <div className="min-h-screen">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/student/dashboard' element={<StudentDashboard />} />
            <Route path='/lecturer/dashboard' element={<LecturerDashboard />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/pre-thesis/:preThesisId' element={<PreThesisPage />} />
            <Route path='/thesis/:thesisId' element={<ThesisPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>

        <FooterComponent />
      </Router>
    </>
  )
}

export default App
