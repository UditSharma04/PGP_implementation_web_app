import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PGPExplained = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "What is PGP?",
      content: (
        <>
          <p className="mb-4">
            <strong>Pretty Good Privacy (PGP)</strong> is an encryption program that provides cryptographic privacy and authentication for data communication. 
            It was created by Phil Zimmermann in 1991.
          </p>
          <p>
            PGP is used for signing, encrypting, and decrypting texts, emails, files, directories, and whole disk partitions to increase the security of email communications.
          </p>
        </>
      )
    },
    {
      title: "Public Key Cryptography",
      content: (
        <>
          <p className="mb-4">
            PGP uses a combination of symmetric-key and public-key cryptography.
          </p>
          <div className="flex flex-col md:flex-row gap-6 my-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 bg-blue-900/30 p-4 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-2 text-blue-400">Public Key</h3>
              <p>Shared with others. Used to encrypt messages that only you can decrypt.</p>
              <div className="mt-4 flex justify-center">
                <motion.div 
                  className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-2xl"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  🔓
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 bg-red-900/30 p-4 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-2 text-red-400">Private Key</h3>
              <p>Kept secret. Used to decrypt messages encrypted with your public key.</p>
              <div className="mt-4 flex justify-center">
                <motion.div 
                  className="w-20 h-20 bg-red-500 rounded-lg flex items-center justify-center text-2xl"
                  whileHover={{ rotate: -10, scale: 1.1 }}
                >
                  🔐
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )
    },
    {
      title: "How PGP Works",
      content: (
        <>
          <p className="mb-6">
            PGP encryption uses a serial combination of hashing, data compression, symmetric-key cryptography, and public-key cryptography.
          </p>
          
          <div className="relative py-8">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="ml-6 mb-8 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-blue-500"></div>
              <h3 className="text-lg font-bold mb-2 text-blue-400">1. Create a Session Key</h3>
              <p>PGP generates a random one-time-use symmetric key (session key).</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="ml-6 mb-8 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-indigo-500"></div>
              <h3 className="text-lg font-bold mb-2 text-indigo-400">2. Encrypt the Message</h3>
              <p>The message is encrypted using the session key with a symmetric algorithm.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="ml-6 mb-8 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-purple-500"></div>
              <h3 className="text-lg font-bold mb-2 text-purple-400">3. Encrypt the Session Key</h3>
              <p>The session key is encrypted with the recipient's public key.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="ml-6 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-pink-500"></div>
              <h3 className="text-lg font-bold mb-2 text-pink-400">4. Send Both</h3>
              <p>The encrypted message and the encrypted session key are sent together.</p>
            </motion.div>
          </div>
        </>
      )
    },
    {
      title: "PGP Decryption Process",
      content: (
        <>
          <p className="mb-6">
            When the recipient receives the encrypted message, the decryption process begins.
          </p>
          
          <div className="relative py-8">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green-500 to-blue-500"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="ml-6 mb-8 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-green-500"></div>
              <h3 className="text-lg font-bold mb-2 text-green-400">1. Decrypt the Session Key</h3>
              <p>The recipient uses their private key to decrypt the session key.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="ml-6 mb-8 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-teal-500"></div>
              <h3 className="text-lg font-bold mb-2 text-teal-400">2. Decrypt the Message</h3>
              <p>The session key is used to decrypt the actual message.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="ml-6 relative"
            >
              <div className="absolute -left-9 w-4 h-4 rounded-full bg-blue-500"></div>
              <h3 className="text-lg font-bold mb-2 text-blue-400">3. Read the Message</h3>
              <p>The recipient can now read the original, decrypted message.</p>
            </motion.div>
          </div>
        </>
      )
    },
    {
      title: "Digital Signatures",
      content: (
        <>
          <p className="mb-6">
            PGP also provides digital signatures, which authenticate the sender and ensure message integrity.
          </p>
          
          <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-4 text-yellow-400">How Digital Signatures Work</h3>
            
            <motion.ol className="space-y-4 list-decimal list-inside">
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                The sender creates a hash (digest) of the message
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                The hash is encrypted with the sender's private key to create the signature
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                The signature is attached to the message
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                The recipient decrypts the signature using the sender's public key
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                The recipient creates a hash of the received message
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                If the decrypted signature matches the calculated hash, the message is authentic
              </motion.li>
            </motion.ol>
          </div>
          
          <p>
            Digital signatures provide <strong>authentication</strong> (confirming who sent the message) and 
            <strong> integrity</strong> (confirming the message wasn't altered).
          </p>
        </>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Understanding PGP Encryption
      </motion.h1>
      
      <div className="flex flex-wrap mb-6">
        {steps.map((step, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 m-1 rounded-full transition-colors ${
              activeStep === index 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
            onClick={() => setActiveStep(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {step.title}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-400">{steps[activeStep].title}</h2>
        {steps[activeStep].content}
      </motion.div>
    </div>
  );
};

export default PGPExplained;
