import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Understanding PGP Encryption
        </h1>
        
        <p className="text-xl mb-8 text-gray-300">
          An interactive demonstration of Pretty Good Privacy encryption - 
          learn how this powerful encryption technology works to secure your communications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-blue-400">What is PGP?</h2>
            <p className="mb-4">Learn about the history and principles behind PGP encryption.</p>
            <Link to="/pgp-explained" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Learn More
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-green-400">Try It Yourself</h2>
            <p className="mb-4">Generate keys, encrypt and decrypt messages in our interactive demo.</p>
            <Link to="/key-generation" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Get Started
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-gray-800/50 p-6 rounded-lg max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-2">Why PGP Matters</h3>
          <p>
            In today's digital world, securing sensitive information is more important than ever. 
            PGP provides a powerful way to protect your communications from prying eyes through 
            strong encryption that has stood the test of time.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
