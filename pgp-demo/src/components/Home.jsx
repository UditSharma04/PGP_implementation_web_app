import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Understanding PGP Encryption
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            An interactive demonstration of Pretty Good Privacy encryption -
            learn how this powerful technology secures your communications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col h-full"
          >
            <div className="text-blue-500 text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-3 text-blue-400">What is PGP?</h2>
            <p className="mb-6 text-gray-300 flex-grow">
              Learn about the history, principles, and technical details behind PGP encryption and how it protects your privacy.
            </p>
            <Link
              to="/pgp-explained"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-blue-500 shadow-md"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col h-full"
          >
            <div className="text-green-500 text-4xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold mb-3 text-green-400">Try It Yourself</h2>
            <p className="mb-6 text-gray-300 flex-grow">
              Generate keys, encrypt and decrypt messages in our interactive demo. Experience PGP encryption firsthand.
            </p>
            <Link
              to="/key-generation"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-green-500 shadow-md"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-blue-800/50 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-blue-300">Why PGP Matters</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              In today's digital world, securing sensitive information is more important than ever.
              PGP provides a powerful way to protect your communications from prying eyes through
              strong encryption that has stood the test of time.
            </p>
            <p>
              Whether you're protecting personal communications, sensitive business data, or ensuring the privacy of your clients,
              understanding PGP is an essential skill in the modern digital landscape.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="text-yellow-500 text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-yellow-400">End-to-End Encryption</h4>
              <p className="text-sm text-gray-400">Only the intended recipient can decrypt your messages</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="text-purple-500 text-3xl mb-2">✓</div>
              <h4 className="font-bold text-purple-400">Digital Signatures</h4>
              <p className="text-sm text-gray-400">Verify the authenticity of messages and files</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="text-blue-500 text-3xl mb-2">🛡️</div>
              <h4 className="font-bold text-blue-400">Strong Security</h4>
              <p className="text-sm text-gray-400">Military-grade encryption protects your data</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
