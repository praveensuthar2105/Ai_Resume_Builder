import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './pages/Root'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import GenerateResume from './pages/GenerateResume'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
           <Route index element={<Home />} />
           <Route path="home" element={<Home />} />
           <Route path="about" element={<About />} />
           <Route path="services" element={<Services />} />
           <Route path="contact" element={<Contact />} />
           <Route path="GenerateResume" element={<GenerateResume />} />
         </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
