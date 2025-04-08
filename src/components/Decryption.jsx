import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as openpgp from 'openpgp';
import MaskedContent from './MaskedContent';
import { createCopyFunction } from '../utils/maskingUtils';

const Decryption = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
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

  const decryptMessage = async () => {
    if (!privateKey || !encryptedMessage) {
      setError('Please provide both a private key and an encrypted message');
      return;
    }

    try {
      setError('');
      setIsDecrypting(true);
      setShowAnimation(true);
      setAnimationStep(0);

      // Parse the private key
      const privKey = await openpgp.readPrivateKey({ armoredKey: privateKey });

      // Decrypt the private key with the passphrase if provided
      const decryptedPrivKey = passphrase
        ? await openpgp.decryptKey({
            privateKey: privKey,
            passphrase
          })
        : privKey;

      // Read the encrypted message
      const message = await openpgp.readMessage({
        armoredMessage: encryptedMessage
      });

      // Decrypt the message
      const { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: decryptedPrivKey
      });

      // Simulate longer process for animation purposes
      setTimeout(() => {
        setDecryptedMessage(decrypted);
        setIsDecrypting(false);
      }, 4000);
    } catch (err) {
      setError('Error decrypting message: ' + err.message);
      setIsDecrypting(false);
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
              animate={{ scale: 1, rotate: [0, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              🔐
            </motion.div>
            <p>Unlocking your private key...</p>
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
              🔒
            </motion.div>
            <p>Reading the encrypted message...</p>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4 inline-block"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: 1, repeatType: "reverse" }}
            >
              🔒
            </motion.div>
            <motion.div
              className="text-6xl mb-4 inline-block absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, repeat: 1, repeatType: "reverse", delay: 0.8 }}
            >
              🔑
            </motion.div>
            <p>Decrypting the session key...</p>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="relative inline-block">
              <motion.div
                className="text-6xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, repeat: 1, repeatType: "reverse" }}
              >
                🔒
              </motion.div>
              <motion.div
                className="text-6xl absolute top-0 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: 1, repeatType: "reverse", delay: 0.8 }}
              >
                📝
              </motion.div>
            </div>
            <p className="mt-4">Decrypting your message...</p>
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
        PGP Decryption
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Decrypt a Message</h2>

          <p className="mb-6">
            Enter your private key, passphrase, and the encrypted message to decrypt it. Only you, with the
            correct private key, can decrypt messages that were encrypted with your public key.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
              <label className="text-gray-300 font-medium md:text-right pt-2">Your Private Key:</label>
              <div className="md:col-span-3">
                <div className="relative">
                  <textarea
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none h-32 font-mono text-sm"
                    placeholder="Paste your private key here..."
                  />
                  {privateKey && (
                    <div className="absolute inset-0 overflow-hidden">
                      <MaskedContent 
                        content={privateKey}
                        maskOptions={maskOptions}
                        buttonPosition="top-right"
                        maxHeight={128}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">This is your private key that will be used to decrypt the message</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
              <label className="text-gray-300 font-medium md:text-right">Passphrase:</label>
              <div className="md:col-span-3">
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter your passphrase"
                />
                <p className="text-xs text-gray-400 mt-1">Required if your private key is protected with a passphrase</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
              <label className="text-gray-300 font-medium md:text-right pt-2">Encrypted Message:</label>
              <div className="md:col-span-3">
                <div className="relative">
                  <textarea
                    value={encryptedMessage}
                    onChange={(e) => setEncryptedMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none h-32 font-mono text-sm"
                    placeholder="Paste the encrypted message here..."
                  />
                  {encryptedMessage && (
                    <div className="absolute inset-0 overflow-hidden">
                      <MaskedContent 
                        content={encryptedMessage}
                        maskOptions={maskOptions}
                        buttonPosition="top-right"
                        maxHeight={128}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">This is the PGP encrypted message you want to decrypt</p>
              </div>
            </div>

            {error && (
              <div className="text-red-400 bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}

            <motion.button
              onClick={decryptMessage}
              disabled={isDecrypting}
              className={`w-full py-2 px-4 rounded font-bold ${
                isDecrypting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
              whileHover={!isDecrypting ? { scale: 1.02 } : {}}
              whileTap={!isDecrypting ? { scale: 0.98 } : {}}
            >
              {isDecrypting ? 'Decrypting...' : 'Decrypt Message'}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400">Decrypted Result</h2>

          {!decryptedMessage && !showAnimation && (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Your decrypted message will appear here</p>
            </div>
          )}

          {showAnimation && !decryptedMessage && (
            <div className="h-64 flex items-center justify-center">
              {renderAnimationStep()}
            </div>
          )}

          {decryptedMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 border border-green-800/30 rounded-lg p-4 bg-gray-800/50"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-green-400 flex items-center">
                  <span className="mr-2 text-lg">🔓</span> Decrypted Message
                </h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(decryptedMessage)
                      .then(() => {
                        setCopySuccess(true);
                        setTimeout(() => setCopySuccess(false), 2000);
                      });
                  }}
                  className={`text-sm border border-green-600/50 ${copySuccess ? 'bg-green-600/20 text-green-400' : 'bg-green-900/30 hover:bg-green-800/50 text-green-400'} px-3 py-1 rounded-md flex items-center`}
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

              <div className="bg-gray-900 p-4 rounded-lg text-white overflow-auto min-h-32 max-h-64 border border-green-800/50" style={{ maxHeight: '200px', overflowX: 'auto', overflowY: 'auto' }}>
                <p className="whitespace-pre-wrap">{decryptedMessage}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-green-900/20 border border-green-800 p-3 rounded-lg"
              >
                <p className="text-green-400 text-sm flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✅</span>
                  <span>
                    <strong>Success!</strong> You've successfully decrypted the message using your private key.
                    This demonstrates the power of asymmetric encryption in PGP.
                  </span>
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Decryption;
