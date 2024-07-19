import { Routes,Route } from 'react-router-dom'
import axios from 'axios';
import Navbar from "../src/components/Navbar"
import Home from "../src/Pages/Home"
import Register from "../src/Pages/Register"
import Login from "../src/Pages/Login"
import './App.css'
import {Toaster } from 'react-hot-toast'

axios.defaults.baseURL='http://localhost:8000';
axios.defaults.withCredentials=true

function App() {
  return (
    <>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App