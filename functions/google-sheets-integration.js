// Google Sheets Integration using Google Apps Script
// This is the CLIENT-SIDE handler for submitting leads to Google Sheets

/**
 * Submit contact form data to Google Sheets via Google Apps Script
 * This is a more secure approach as credentials stay on Google's servers
 */
async function submitToGoogleSheets(formData) {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  
  try {
    // Create the data object
    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message || 'No message provided',
    };

    // Submit to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'Thank you! We will be in touch soon.',
    };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again or contact support.',
    };
  }
}

/**
 * Validate form data
 */
function validateFormData(data) {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name' };
  }
  
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  if (!data.company || data.company.trim().length < 2) {
    return { valid: false, error: 'Please enter your company name' };
  }
  
  return { valid: true };
}

// Export functions for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    submitToGoogleSheets,
    validateFormData,
  };
}

