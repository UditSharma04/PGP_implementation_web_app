import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { maskPGPContent, createVisibilityToggle } from '../utils/maskingUtils';

/**
 * A component for displaying masked PGP content with a toggle button
 * @param {Object} props - Component props
 * @param {string} props.content - The content to display/mask
 * @param {Object} props.maskOptions - Options for masking (passed to maskPGPContent)
 * @param {boolean} props.initiallyVisible - Whether content is initially visible (default: false)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.buttonPosition - Position of toggle button ('top-right', 'bottom-right', etc.)
 * @param {Function} props.onCopy - Function called when copy button is clicked
 * @param {boolean} props.copySuccess - Whether copy was successful
 * @param {boolean} props.showCopyButton - Whether to show copy button (default: true)
 * @param {number} props.maxHeight - Maximum height of the content container (default: 300)
 */
const MaskedContent = ({
  content,
  maskOptions = {},
  initiallyVisible = false,
  className = '',
  buttonPosition = 'top-right',
  onCopy,
  copySuccess,
  showCopyButton = true,
  maxHeight = 300
}) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const toggleVisibility = createVisibilityToggle(setIsVisible, initiallyVisible);
  
  // Don't mask if content is empty
  if (!content) return null;
  
  const maskedContent = maskPGPContent(content, maskOptions);
  const displayContent = isVisible ? content : maskedContent;
  const isMasked = !isVisible && content !== '';
  
  // Determine button position classes
  let buttonPositionClass = 'top-2 right-2';
  if (buttonPosition === 'bottom-right') buttonPositionClass = 'bottom-2 right-2';
  if (buttonPosition === 'top-left') buttonPositionClass = 'top-2 left-2';
  if (buttonPosition === 'bottom-left') buttonPositionClass = 'bottom-2 left-2';
  
  return (
    <div className={`relative font-mono text-sm ${className}`}>
      <pre 
        className="whitespace-pre-wrap break-all bg-gray-700 p-4 rounded-lg overflow-auto"
        style={{ maxHeight: `${maxHeight}px`, overflowX: 'auto', overflowY: 'auto' }}
      >
        {displayContent}
      </pre>
      
      {/* Toggle visibility button */}
      <motion.button
        onClick={toggleVisibility}
        className={`absolute ${buttonPositionClass} p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isVisible ? 'Hide content' : 'Show content'}
      >
        <span className="text-lg">
          {isVisible ? '👁️' : '👁️‍🗨️'}
        </span>
      </motion.button>
      
      {/* Copy button */}
      {showCopyButton && onCopy && (
        <motion.button
          onClick={() => onCopy(content)}
          className={`absolute ${buttonPosition === 'top-right' || buttonPosition === 'bottom-right' ? 'right-14' : 'left-14'} ${buttonPosition === 'top-right' || buttonPosition === 'top-left' ? 'top-2' : 'bottom-2'} p-2 rounded-full ${copySuccess ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Copy to clipboard"
        >
          <span className="text-lg">
            {copySuccess ? '✓' : '📋'}
          </span>
        </motion.button>
      )}
      
      {/* Visual indicator that content is masked */}
      {isMasked && (
        <div className="absolute bottom-2 left-2 text-xs text-gray-400 flex items-center">
          <span className="mr-1">🔒</span>
          <span>Content masked</span>
        </div>
      )}
    </div>
  );
};

export default MaskedContent;