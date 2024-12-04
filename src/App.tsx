import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './page/Home'
import StudentDashboard from './page/dashboard/student/StudentDashboard'
import LecturerDashboard from './page/dashboard/lecturer/LecturerDashboard'
import AdminDashboard from './page/dashboard/admin/AdminDashboard'
import ThesisAppLogo from './assets/ThesisAppLogo.webp'
import FooterComponent from './components/FooterComponent'
import PreThesisPage from './page/dashboard/admin/PreThesisPage'
import ThesisPage from './page/dashboard/admin/ThesisPage'
import NotFoundPage from './page/error/NotFoundPage'
import MentoringSessionsPage from './page/dashboard/admin/MentoringSessionsPage'
import CreateMentorPairPage from './page/dashboard/admin/mentorPair/CreateMentorPairPage'
import EditMentorPairPage from './page/dashboard/admin/mentorPair/EditMentorPairPage'
import CreateThesisDefencePage from './page/dashboard/admin/thesisDefence/CreateThesisDefencePage'
import EditThesisDefencePage from './page/dashboard/admin/thesisDefence/EditThesisDefencePage'

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

            <Route path='/create/mentor-pair/:preThesisId' element={<CreateMentorPairPage />} />

            <Route path='/edit/mentor-pair/:studentId' element={<EditMentorPairPage />} />

            <Route path='/mentoring-sessions/:mentorPairId' element={<MentoringSessionsPage />} />

            <Route path='/thesis/:thesisId' element={<ThesisPage />} />

            <Route path='/create/thesis-defence/:thesisId' element={<CreateThesisDefencePage />} />

            <Route path='/edit/thesis-defence/:studentId' element={<EditThesisDefencePage />} />
            
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>

        <FooterComponent />
      </Router>
    </>
  )
}

export default App
