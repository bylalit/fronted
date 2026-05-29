import {Route, Routes} from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Category from './pages/Category'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Register from './pages/Register'
import Login from './pages/Login'
import UserAcoount from './pages/UserAcoount'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';

function App() {

  const [search, setSearch] = useState("")
  return (
    <>
        <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000, // 3.5 seconds baad automatic gayab ho jayega
          style: {
            background: '#ffffff',
            color: '#333333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500'
          },
        }} 
      />
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/category' element={<Category search={search} />} />
          <Route path='/productDetails/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={<UserAcoount />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
