import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Import our components
import Home from './components/Home'
import KeyGeneration from './components/KeyGeneration'
import Encryption from './components/Encryption'
import Decryption from './components/Decryption'
import PGPExplained from './components/PGPExplained'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <header className="sticky top-0 z-50 bg-gray-900 shadow-lg border-b border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <div className="text-blue-500 text-3xl">🔐</div>
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  PGP Demonstration
                </div>
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                    ) : (
                      <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Desktop Navigation */}
              <motion.div
                className="hidden md:flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <NavLink to="/" className={({isActive}) =>
                  `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                }>
                  Home
                </NavLink>
                <NavLink to="/pgp-explained" className={({isActive}) =>
                  `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                }>
                  What is PGP?
                </NavLink>
                <NavLink to="/key-generation" className={({isActive}) =>
                  `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                }>
                  Key Generation
                </NavLink>
                <NavLink to="/encryption" className={({isActive}) =>
                  `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                }>
                  Encryption
                </NavLink>
                <NavLink to="/decryption" className={({isActive}) =>
                  `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                }>
                  Decryption
                </NavLink>
              </motion.div>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-800 border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-2 space-y-1">
                <NavLink to="/" className={({isActive}) =>
                  `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                } onClick={() => setIsMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/pgp-explained" className={({isActive}) =>
                  `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                } onClick={() => setIsMenuOpen(false)}>
                  What is PGP?
                </NavLink>
                <NavLink to="/key-generation" className={({isActive}) =>
                  `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                } onClick={() => setIsMenuOpen(false)}>
                  Key Generation
                </NavLink>
                <NavLink to="/encryption" className={({isActive}) =>
                  `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                } onClick={() => setIsMenuOpen(false)}>
                  Encryption
                </NavLink>
                <NavLink to="/decryption" className={({isActive}) =>
                  `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                } onClick={() => setIsMenuOpen(false)}>
                  Decryption
                </NavLink>
              </div>
            </motion.div>
          )}
        </header>

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pgp-explained" element={<PGPExplained />} />
            <Route path="/key-generation" element={<KeyGeneration />} />
            <Route path="/encryption" element={<Encryption />} />
            <Route path="/decryption" element={<Decryption />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center text-gray-400">
          <div className="container mx-auto px-4">
            <p>PGP Demonstration Project - Educational Purposes Only</p>
            <p className="text-sm mt-2">© {new Date().getFullYear()} - Secure Communications with PGP</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
