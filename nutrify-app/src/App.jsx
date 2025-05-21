import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Track from './components/Track'
import Diet from './components/Diet'
import UserContext from './contexts/userContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import Private from './components/Private'
function App() {
  const [count, setCount] = useState(0)
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('nutrify-user')));


  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/track" element={<Private Component={Track} />}></Route>
            <Route path="/Diet" element={<Private Component={Diet} />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
