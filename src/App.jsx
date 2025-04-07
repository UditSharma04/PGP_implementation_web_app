import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Import our components (we'll create these next)
import Home from './components/Home'
import KeyGeneration from './components/KeyGeneration'
import Encryption from './components/Encryption'
import Decryption from './components/Decryption'
import PGPExplained from './components/PGPExplained'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <header className="p-4 bg-gray-800 shadow-md">
          <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4 md:mb-0"
            >
              PGP Demonstration
            </motion.div>
            <motion.ul 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/pgp-explained" className="hover:text-blue-400 transition-colors">What is PGP?</Link></li>
              <li><Link to="/key-generation" className="hover:text-blue-400 transition-colors">Key Generation</Link></li>
              <li><Link to="/encryption" className="hover:text-blue-400 transition-colors">Encryption</Link></li>
              <li><Link to="/decryption" className="hover:text-blue-400 transition-colors">Decryption</Link></li>
            </motion.ul>
          </nav>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pgp-explained" element={<PGPExplained />} />
            <Route path="/key-generation" element={<KeyGeneration />} />
            <Route path="/encryption" element={<Encryption />} />
            <Route path="/decryption" element={<Decryption />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 p-4 text-center text-gray-400 mt-auto">
          <p>PGP Demonstration Project - Educational Purposes Only</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
