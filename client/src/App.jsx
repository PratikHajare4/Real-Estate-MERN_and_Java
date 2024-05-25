import React from 'react'
import { BrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'

import FreeConsultation from './pages/FreeConsultation'
import Referral from './pages/Referral'
import GroupBookingDiscount from './pages/GroupBookingDiscount'
import ContactUs from './pages/ContactUs'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/Dashboard'
import Residential from './pages/Residential'
import Commercial from './pages/Commercial'
import CreateListing from './pages/CreateListing'
import Career from './pages/Career'


 


export default function App() {
  return <BrowserRouter>
  
   
  <Header/>
  
  <Routes>
<Route path="/" element={<Home/>} />


<Route path="/about" element={<About/>} />
<Route path="/profile" element={<Profile/>} />

<Route path="/freeConsultation" element={<FreeConsultation/>} /> 
<Route path="/group" element={<GroupBookingDiscount/>} /> 

<Route path="/referral" element={<Referral/>} /> 

<Route path="/residential" element={<Residential/>} />

<Route path="/contact" element={<ContactUs/>} />
{/* <Route path="/admin" element={<Admin/>} /> */}

<Route path="/admin/login" element={<SignInPage/>} />
<Route path="/dash" element={<Dashboard/>} />
<Route path="/commercial" element={<Commercial/>} />
<Route path="/create-listing" element={<CreateListing/>} />


<Route path="/career" element={<Career/>} />




  </Routes>
  </BrowserRouter>
    
  
}
