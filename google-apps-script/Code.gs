// Google Apps Script for TuringForce Contact Form
// Deploy this as a web app to capture leads in Google Sheets

// Configuration
const SHEET_NAME = 'Leads';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Company', 'Message'];

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Get the active spreadsheet (link this script to your Google Sheet)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Create headers if they don't exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }
    
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.message || 'No message provided'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Lead captured successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'An error occurred while processing your request' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('TuringForce Contact Form API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function to verify the setup
 */
function testFunction() {
  const mockData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(mockData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}

