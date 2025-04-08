import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as openpgp from 'openpgp';
import MaskedContent from './MaskedContent';
import { createCopyFunction, downloadAsFile } from '../utils/maskingUtils';

const KeyGeneration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [keySize, setKeySize] = useState(2048);
  const [isGenerating, setIsGenerating] = useState(false);
  const [keyPair, setKeyPair] = useState(null);
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [copySuccess, setCopySuccess] = useState({ public: false, private: false });

  const generateKeyPair = async () => {
    if (!name || !email || !passphrase) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setIsGenerating(true);
      setShowAnimation(true);

      // Generate key pair using OpenPGP.js
      const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa',
        rsaBits: keySize,
        userIDs: [{ name, email }],
        passphrase
      });

      // Simulate longer process for animation purposes
      setTimeout(() => {
        setKeyPair({ privateKey, publicKey });
        setIsGenerating(false);
      }, 3000);
    } catch (err) {
      setError('Error generating keys: ' + err.message);
      setIsGenerating(false);
      setShowAnimation(false);
    }
  };

  // Handle copying key to clipboard
  const handleCopy = (text, type) => {
    copyToClipboard(text);
    setCopySuccess({ ...copySuccess, [type]: true });
    
    // Reset success message after 2 seconds
    setTimeout(() => {
      setCopySuccess({ ...copySuccess, [type]: false });
    }, 2000);
  };

  const copyToClipboard = createCopyFunction((type) => {
    setCopySuccess({ ...copySuccess, [type]: true });
    setTimeout(() => setCopySuccess({ ...copySuccess, [type]: false }), 2000);
  });
  
  // Define masking options
  const maskOptions = {
    showHeaders: true,
    visibleStart: 10,
    visibleEnd: 5,
    maskChar: '•',
    preserveLength: false,
    showLineCount: true
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PGP Key Generation
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400">Generate Your Keys</h2>

          <p className="mb-6">
            Fill in the form below to generate your PGP key pair. The public key can be shared with others,
            while the private key should be kept secret and protected with a strong passphrase.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
              <label className="text-gray-300 font-medium md:text-right">Full Name:</label>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
              <label className="text-gray-300 font-medium md:text-right">Email Address:</label>
              <div className="md:col-span-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
              <label className="text-gray-300 font-medium md:text-right">Passphrase:</label>
              <div className="md:col-span-2">
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter a strong passphrase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
              <label className="text-gray-300 font-medium md:text-right">Key Size (bits):</label>
              <div className="md:col-span-2">
                <select
                  value={keySize}
                  onChange={(e) => setKeySize(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value={2048}>2048 (Recommended)</option>
                  <option value={4096}>4096 (More secure, slower)</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="text-red-400 bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}

            <motion.button
              onClick={generateKeyPair}
              disabled={isGenerating}
              className={`w-full py-2 px-4 rounded font-bold ${
                isGenerating
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              whileHover={!isGenerating ? { scale: 1.02 } : {}}
              whileTap={!isGenerating ? { scale: 0.98 } : {}}
            >
              {isGenerating ? 'Generating...' : 'Generate Key Pair'}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Your PGP Keys</h2>

          {!keyPair && !showAnimation && (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Your generated keys will appear here</p>
            </div>
          )}

          {showAnimation && !keyPair && (
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-4 left-4 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-8 left-8 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="mt-4 text-blue-400">Generating secure keys...</p>
              <p className="text-sm text-gray-400 mt-2">This may take a moment</p>
            </div>
          )}

          {keyPair && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-green-800/30 rounded-lg p-4 bg-gray-800/50"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-green-400 flex items-center">
                    <span className="mr-2 text-lg">🔑</span> Public Key
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadAsFile(keyPair.publicKey, `pgp-public-key-${name.replace(/\s+/g, '-')}.asc`)}
                      className="text-sm border border-green-600/50 bg-green-900/30 hover:bg-green-800/50 text-green-400 px-3 py-1 rounded-md flex items-center"
                      title="Download public key as text file"
                    >
                      <span className="mr-1">💾</span> Download
                    </button>
                    <button
                      onClick={() => handleCopy(keyPair.publicKey, 'public')}
                      className={`text-sm border border-blue-600/50 ${copySuccess.public ? 'bg-green-600/20 text-green-400' : 'bg-blue-900/30 hover:bg-blue-800/50 text-blue-400'} px-3 py-1 rounded-md flex items-center`}
                    >
                      {copySuccess.public ? (
                        <>
                          <span className="mr-1">✓</span> Copied!
                        </>
                      ) : (
                        <>
                          <span className="mr-1">📋</span> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg text-gray-300 text-sm font-mono overflow-auto max-h-48 border border-gray-700">
                  <MaskedContent 
                    content={keyPair.publicKey}
                    maskOptions={maskOptions}
                    onCopy={(text) => handleCopy(text, 'public')}
                    copySuccess={copySuccess.public}
                    maxHeight={200}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center">
                  <span className="text-green-500 mr-1">ℹ️</span>
                  Share your public key with others so they can encrypt messages for you.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border border-red-800/30 rounded-lg p-4 bg-gray-800/50"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-red-400 flex items-center">
                    <span className="mr-2 text-lg">🔐</span> Private Key
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadAsFile(keyPair.privateKey, `pgp-private-key-${name.replace(/\s+/g, '-')}.asc`)}
                      className="text-sm border border-yellow-600/50 bg-yellow-900/30 hover:bg-yellow-800/50 text-yellow-400 px-3 py-1 rounded-md flex items-center"
                      title="Download private key as text file"
                    >
                      <span className="mr-1">💾</span> Download
                    </button>
                    <button
                      onClick={() => handleCopy(keyPair.privateKey, 'private')}
                      className={`text-sm border border-red-600/50 ${copySuccess.private ? 'bg-green-600/20 text-green-400' : 'bg-red-900/30 hover:bg-red-800/50 text-red-400'} px-3 py-1 rounded-md flex items-center`}
                    >
                      {copySuccess.private ? (
                        <>
                          <span className="mr-1">✓</span> Copied!
                        </>
                      ) : (
                        <>
                          <span className="mr-1">📋</span> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg text-gray-300 text-sm font-mono overflow-auto max-h-48 border border-gray-700">
                  <MaskedContent 
                    content={keyPair.privateKey}
                    maskOptions={maskOptions}
                    onCopy={(text) => handleCopy(text, 'private')}
                    copySuccess={copySuccess.private}
                    maxHeight={200}
                  />
                </div>
                <p className="text-xs text-red-400 mt-2 font-bold flex items-center">
                  <span className="text-red-500 mr-1">⚠️</span>
                  IMPORTANT: Keep your private key secret! Never share it with anyone.
                </p>
              </motion.div>

              <div className="bg-yellow-900/20 border border-yellow-800 p-3 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Security Tip:</strong> Store your private key securely and remember your passphrase.
                  If you lose either, you won't be able to decrypt messages sent to you.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default KeyGeneration;
