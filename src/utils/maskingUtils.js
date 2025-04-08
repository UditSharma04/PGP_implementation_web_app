/**
 * Utility functions for masking sensitive PGP content
 */

/**
 * Masks PGP content (keys or messages) with asterisks while preserving format
 * @param {string} content - The PGP content to mask
 * @param {Object} options - Configuration options
 * @param {boolean} options.showHeaders - Whether to show header/footer lines (default: true)
 * @param {number} options.visibleStart - Number of characters to show at start of content lines (default: 10)
 * @param {number} options.visibleEnd - Number of characters to show at end of content lines (default: 5)
 * @param {string} options.maskChar - Character to use for masking (default: '•')
 * @param {boolean} options.preserveLength - Whether to preserve the exact length of each line (default: false)
 * @param {boolean} options.showLineCount - Whether to show the number of masked lines (default: true)
 * @returns {string} Masked content
 */
export const maskPGPContent = (content, options = {}) => {
  if (!content) return '';
  
  const {
    showHeaders = true,
    visibleStart = 10,
    visibleEnd = 5,
    maskChar = '•',
    preserveLength = false,
    showLineCount = true
  } = options;
  
  const lines = content.split('\n');
  const maskedLines = [];
  let maskedLineCount = 0;
  
  // Determine if this is a PGP block (has BEGIN/END markers)
  const isPGPBlock = lines.some(line => 
    line.includes('-----BEGIN PGP') || line.includes('-----END PGP'));
  
  // For PGP blocks with headers/footers
  if (isPGPBlock) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isHeaderOrFooter = line.includes('-----BEGIN') || line.includes('-----END');
      const isEmpty = line.trim() === '';
      
      // Keep header/footer lines and empty lines intact
      if ((isHeaderOrFooter && showHeaders) || isEmpty) {
        maskedLines.push(line);
      } 
      // First and last content lines - show partial content
      else if ((i === 1 || i === lines.length - 2)) {
        // Ensure we have enough characters for masking
        if (line.length > (visibleStart + visibleEnd)) {
          const maskLength = preserveLength 
            ? Math.max(0, line.length - visibleStart - visibleEnd) 
            : Math.max(0, Math.min(20, line.length - visibleStart - visibleEnd));
          
          maskedLines.push(
            line.substring(0, visibleStart) + 
            maskChar.repeat(maskLength) + 
            line.substring(Math.max(visibleStart, line.length - visibleEnd))
          );
        } else {
          // If line is too short, just show it as is
          maskedLines.push(line);
        }
        maskedLineCount++;
      } 
      // Middle content lines - mask completely
      else {
        const maskLength = preserveLength 
          ? Math.max(0, line.length) 
          : Math.max(0, Math.min(40, line.length));
        
        maskedLines.push(maskChar.repeat(maskLength));
        maskedLineCount++;
      }
    }
  } 
  // For regular text (not PGP blocks)
  else {
    // For short messages, show first and last few characters
    if (content.length <= 50) {
      // Ensure we have enough characters for masking
      if (content.length > 10) {
        const maskLength = preserveLength 
          ? Math.max(0, content.length - 10) 
          : Math.max(0, Math.min(20, content.length - 10));
        
        return content.substring(0, 5) + maskChar.repeat(maskLength) + content.substring(Math.max(content.length - 5, 5));
      } else {
        // If content is too short, just return it as is
        return content;
      }
    }
    
    // For longer messages, handle line by line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') {
        maskedLines.push(line);
        continue;
      }
      
      // First and last lines - show partial
      if (i === 0 || i === lines.length - 1) {
        if (line.length > (visibleStart + visibleEnd)) {
          const maskLength = preserveLength 
            ? Math.max(0, line.length - visibleStart - visibleEnd) 
            : Math.max(0, Math.min(20, line.length - visibleStart - visibleEnd));
          
          maskedLines.push(
            line.substring(0, visibleStart) + 
            maskChar.repeat(maskLength) + 
            line.substring(Math.max(visibleStart, line.length - visibleEnd))
          );
        } else {
          maskedLines.push(line);
        }
        maskedLineCount++;
      } 
      // Middle lines - mask more aggressively
      else {
        const maskLength = preserveLength 
          ? Math.max(0, line.length) 
          : Math.max(0, Math.min(40, line.length));
        
        maskedLines.push(maskChar.repeat(maskLength));
        maskedLineCount++;
      }
    }
  }
  
  // Add line count indicator if requested
  if (showLineCount && maskedLineCount > 0) {
    const result = maskedLines.join('\n');
    const countMessage = `[${maskedLineCount} line${maskedLineCount !== 1 ? 's' : ''} masked]`;
    
    // For PGP blocks, add the count before the end marker
    if (isPGPBlock) {
      const endMarkerIndex = result.lastIndexOf('-----END');
      if (endMarkerIndex !== -1) {
        const beforeEnd = result.substring(0, endMarkerIndex);
        const endPart = result.substring(endMarkerIndex);
        return beforeEnd + countMessage + '\n' + endPart;
      }
    }
    
    // For regular text, add at the end
    return result + '\n' + countMessage;
  }
  
  return maskedLines.join('\n');
};

/**
 * Creates a toggle function for showing/hiding masked content
 * @param {Function} setState - State setter function
 * @param {boolean} initialState - Initial visibility state
 * @returns {Function} Toggle function
 */
export const createVisibilityToggle = (setState, initialState = false) => {
  return () => setState(prevState => !prevState);
};

/**
 * Creates a component for displaying masked content with a toggle button
 * @param {Object} props - Component props
 * @param {string} props.content - The content to mask
 * @param {boolean} props.isVisible - Whether the content is currently visible
 * @param {Function} props.toggleVisibility - Function to toggle visibility
 * @param {Object} props.maskOptions - Options for masking (passed to maskPGPContent)
 * @returns {Object} Component props including maskedContent and displayContent
 */
export const useMaskedContent = (content, isVisible = false, maskOptions = {}) => {
  const maskedContent = maskPGPContent(content, maskOptions);
  const displayContent = isVisible ? content : maskedContent;
  
  return {
    maskedContent,
    displayContent,
    isMasked: !isVisible && content !== ''
  };
};

/**
 * Utility function to create a copy-to-clipboard function with success state
 * @param {Function} setSuccessState - State setter for copy success
 * @param {number} resetDelay - Delay in ms before resetting success state (default: 2000)
 * @returns {Function} Copy function that takes text to copy
 */
export const createCopyFunction = (setSuccessState, resetDelay = 2000) => {
  return (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setSuccessState(true);
        setTimeout(() => setSuccessState(false), resetDelay);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
};

/**
 * Utility function to download content as a text file
 * @param {string} content - The content to download
 * @param {string} filename - The name of the file to download
 */
export const downloadAsFile = (content, filename) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};