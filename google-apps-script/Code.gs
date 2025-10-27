// Google Apps Script for TuringForce Contact Form
// Enhanced with email notifications, duplicate detection, and analytics

// Configuration
const SHEET_NAME = 'Leads';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Company', 'Message', 'Status', 'Duplicate'];

// Email configuration - UPDATE WITH YOUR EMAIL
const NOTIFICATION_EMAIL = 'your-email@example.com'; // ⚠️ UPDATE THIS!
const SEND_EMAIL_NOTIFICATIONS = true; // Set to false to disable email notifications

/**
 * Handle POST requests from the contact form
 * Enhanced with duplicate detection and email notifications
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
    
    // Validate required fields
    if (!data.name || !data.email || !data.company) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          message: 'Missing required fields' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check for duplicate email addresses
    const existingEmails = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues().flat();
    const isDuplicate = existingEmails.some(email => email.toLowerCase() === data.email.toLowerCase());
    
    // Prepare the row data
    const timestamp = data.timestamp || new Date().toISOString();
    const status = isDuplicate ? 'Duplicate' : 'New Lead';
    
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.company || '',
      data.message || 'No message provided',
      status,
      isDuplicate ? 'Yes' : 'No'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (only for new leads and if enabled)
    if (SEND_EMAIL_NOTIFICATIONS && !isDuplicate) {
      sendEmailNotification(data);
    }
    
    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Lead captured successfully',
        isDuplicate: isDuplicate
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
 * Send email notification for new leads
 * Customize this function to match your notification preferences
 */
function sendEmailNotification(data) {
  try {
    const subject = `🎯 New Lead: ${data.name} from ${data.company}`;
    
    const body = `
<h2>🎉 New Lead Captured</h2>

<h3>Contact Information:</h3>
<ul>
  <li><strong>Name:</strong> ${data.name}</li>
  <li><strong>Email:</strong> ${data.email}</li>
  <li><strong>Company:</strong> ${data.company}</li>
</ul>

<h3>Message:</h3>
<p>${data.message || 'No message provided'}</p>

<hr>
<p><small>This is an automated notification from TuringForce Contact Form</small></p>
    `;
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: body,
    });
    
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't fail the entire request if email fails
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

