import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as openpgp from 'openpgp';
import MaskedContent from './MaskedContent';
import { createCopyFunction } from '../utils/maskingUtils';

const Encryption = () => {
  const [recipientPublicKey, setRecipientPublicKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (showAnimation) {
      timer = setTimeout(() => {
        if (animationStep < 3) {
          setAnimationStep(animationStep + 1);
        } else {
          setShowAnimation(false);
          setAnimationStep(0);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showAnimation, animationStep]);

  const encryptMessage = async () => {
    if (!recipientPublicKey || !message) {
      setError('Please provide both a public key and a message');
      return;
    }

    try {
      setError('');
      setIsEncrypting(true);
      setShowAnimation(true);
      setAnimationStep(0);

      // Parse the public key
      const publicKey = await openpgp.readKey({ armoredKey: recipientPublicKey });

      // Encrypt the message
      const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }),
        encryptionKeys: publicKey
      });

      // Simulate longer process for animation purposes
      setTimeout(() => {
        setEncryptedMessage(encrypted);
        setIsEncrypting(false);
      }, 4000);
    } catch (err) {
      setError('Error encrypting message: ' + err.message);
      setIsEncrypting(false);
      setShowAnimation(false);
    }
  };

  // Create copy function with success state handling
  const copyToClipboard = createCopyFunction(setCopySuccess);
  
  // Define masking options
  const maskOptions = {
    showHeaders: true,
    visibleStart: 10,
    visibleEnd: 5,
    maskChar: '•',
    preserveLength: false,
    showLineCount: true
  };

  const renderAnimationStep = () => {
    switch (animationStep) {
      case 0:
        return (
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4 inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              📝
            </motion.div>
            <p>Preparing your message...</p>
          </div>
        );
      case 1:
        return (
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4 inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🔑
            </motion.div>
            <p>Generating a random session key...</p>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <div className="relative inline-block">
              <motion.div
                className="text-6xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, repeat: 1, repeatType: "reverse" }}
              >
                📝
              </motion.div>
              <motion.div
                className="text-6xl absolute top-0 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: 1, repeatType: "reverse", delay: 0.8 }}
              >
                🔒
              </motion.div>
            </div>
            <p className="mt-4">Encrypting your message with the session key...</p>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4 inline-block"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🔒
            </motion.div>
            <p>Encrypting the session key with recipient's public key...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PGP Encryption
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Encrypt a Message</h2>

          <p className="mb-6">
            Enter the recipient's public key and your message to encrypt it. Only the recipient with the
            corresponding private key will be able to decrypt and read your message.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
              <label className="text-gray-300 font-medium md:text-right pt-2">Recipient's Public Key:</label>
              <div className="md:col-span-3">
                <div className="relative">
                  <textarea
                    value={recipientPublicKey}
                    onChange={(e) => setRecipientPublicKey(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none h-32 font-mono text-sm"
                    placeholder="Paste recipient's public key here..."
                  />
                  {recipientPublicKey && (
                    <div className="absolute inset-0 overflow-hidden">
                      <MaskedContent 
                        content={recipientPublicKey}
                        maskOptions={maskOptions}
                        buttonPosition="top-right"
                        maxHeight={128}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">This is the public key of the person who will receive your message</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
              <label className="text-gray-300 font-medium md:text-right pt-2">Your Message:</label>
              <div className="md:col-span-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none h-32"
                  placeholder="Type your message here..."
                />
                <p className="text-xs text-gray-400 mt-1">This message will be encrypted and only the recipient can read it</p>
              </div>
            </div>

            {error && (
              <div className="text-red-400 bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}

            <motion.button
              onClick={encryptMessage}
              disabled={isEncrypting}
              className={`w-full py-2 px-4 rounded font-bold ${
                isEncrypting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              whileHover={!isEncrypting ? { scale: 1.02 } : {}}
              whileTap={!isEncrypting ? { scale: 0.98 } : {}}
            >
              {isEncrypting ? 'Encrypting...' : 'Encrypt Message'}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400">Encrypted Result</h2>

          {!encryptedMessage && !showAnimation && (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Your encrypted message will appear here</p>
            </div>
          )}

          {showAnimation && !encryptedMessage && (
            <div className="h-64 flex items-center justify-center">
              {renderAnimationStep()}
            </div>
          )}

          {encryptedMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 border border-green-800/30 rounded-lg p-4 bg-gray-800/50"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-green-400 flex items-center">
                  <span className="mr-2 text-lg">🔒</span> PGP Encrypted Message
                </h3>
                <button
                  onClick={() => copyToClipboard(encryptedMessage)}
                  className={`text-sm border border-blue-600/50 ${copySuccess ? 'bg-green-600/20 text-green-400' : 'bg-blue-900/30 hover:bg-blue-800/50 text-blue-400'} px-3 py-1 rounded-md flex items-center`}
                >
                  {copySuccess ? (
                    <>
                      <span className="mr-1">✓</span> Copied!
                    </>
                  ) : (
                    <>
                      <span className="mr-1">📋</span> Copy Message
                    </>
                  )}
                </button>
              </div>

              <MaskedContent 
                content={encryptedMessage}
                maskOptions={maskOptions}
                onCopy={copyToClipboard}
                copySuccess={copySuccess}
                buttonPosition="top-right"
              />

              <div className="bg-blue-900/20 border border-blue-800 p-3 rounded-lg">
                <p className="text-blue-400 text-sm flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">ℹ️</span>
                  <span>
                    <strong>Note:</strong> This encrypted message can only be decrypted by the person who has
                    the private key corresponding to the public key you used for encryption.
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Encryption;
