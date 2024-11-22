import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import AdminDashboard from './admin/AdminDashboard'
import NavBar from './components/NavBar'
import ThesisAppLogo from './assets/ThesisAppLogo.webp'

function App() {
  return (
    <>
      <NavBar image={ThesisAppLogo} />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
