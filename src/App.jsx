import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import ListUsers from './components/ListUsers'
import { Routes, Route } from 'react-router-dom';
import UserDetail from './components/UserDetail';
import { AuthProvider } from './providers/AuthProvider'
import { RequireAuth } from './components/RequireAuth';
import Nav from './components/Nav';
import Pag from './components/Pag';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        {/* <Login /> */}
        {/* <ListUsers/> */}
        <Nav/>
        <Pag/>
        <Routes>
          <Route path="/" element={<RequireAuth><ListUsers /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
      </AuthProvider>

    </>
  )
}

export default App
