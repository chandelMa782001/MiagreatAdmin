import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './component/Login'
import Dashboard from './component/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
