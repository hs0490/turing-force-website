# Google Sheets Integration Setup Guide

This guide will help you integrate the TuringForce contact form with Google Sheets to capture leads securely.

## 📋 Prerequisites

1. **Google Account** with access to Google Sheets
2. **Google Spreadsheet** to store the leads
3. **Google Apps Script** access (included with Google account)

---

## 🚀 Setup Instructions

### Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet and name it "TuringForce Leads"
3. Create a sheet named "Leads" (or use the default sheet)
4. Add headers in Row 1 (A1 through E1):
   - **A1**: `Timestamp`
   - **B1**: `Name`
   - **C1**: `Email`
   - **D1**: `Company`
   - **E1**: `Message`

5. Format the header row (bold, background color, etc.) for better readability

---

### Step 2: Create Google Apps Script

1. In your Google Spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the entire contents of `google-apps-script/Code.gs` into the editor
4. Save the project (Ctrl+S or Cmd+S)
5. Name it "TuringForce Contact Form Handler"

---

### Step 3: Deploy the Script as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "TuringForce Contact Form API"
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` (this allows the website to submit data)
4. Click **Deploy**
5. Click **Authorize access** (you may need to grant permissions)
6. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfyc.../exec`)
7. Save this URL - you'll need it in the next step

---

### Step 4: Update Your Website

1. Open `index.html` in your code editor
2. Find line 721: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';`
3. Replace `YOUR_SCRIPT_ID` with the actual Web App URL from Step 3
4. It should look like:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc...YOUR_ID/exec';
   ```
5. Save the file

---

### Step 5: Test the Integration

1. Open your website in a browser
2. Scroll to the "Get Started Today" section
3. Fill out the contact form with test data:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Company**: Test Company
   - **Message**: This is a test message
4. Click "Start Free Trial"
5. Check your Google Spreadsheet - you should see a new row with the test data

---

## 🔒 Security & Compliance

### Security Features Implemented:

✅ **Google Apps Script Security**
- Credentials and authentication handled by Google
- No API keys exposed in client-side code
- HTTPS enforced by Google

✅ **Data Validation**
- Client-side validation before submission
- Server-side validation in Apps Script
- Email format validation
- Required field validation

✅ **Privacy Compliance**
- No sensitive authentication credentials in client code
- Data transmission over HTTPS
- User consent implied by form submission

### Additional Security Recommendations:

1. **Rate Limiting**: Consider adding rate limiting in the Apps Script to prevent abuse
2. **CAPTCHA**: Add Google reCAPTCHA for bot protection (optional)
3. **Data Retention**: Set up automatic deletion of old leads in Google Sheets
4. **Access Control**: Limit access to the Google Spreadsheet to authorized personnel only

---

## 📊 Data Structure

The Google Sheet will contain the following columns:

| Column | Field | Data Type | Description |
|--------|-------|-----------|-------------|
| A | Timestamp | ISO DateTime | Auto-generated submission timestamp |
| B | Name | Text | Full name of the lead |
| C | Email | Email | Work email of the lead |
| D | Company | Text | Company name |
| E | Message | Text | PMO challenge description or custom message |

---

## 🛠️ Troubleshooting

### Form submission returns an error

1. **Check the Script URL**: Ensure the Google Apps Script URL in `index.html` is correct
2. **Check Permissions**: Make sure the script is deployed with "Anyone" access
3. **Check Browser Console**: Open Developer Tools (F12) and look for JavaScript errors
4. **Check Apps Script Logs**: In Apps Script editor, click "Executions" to see error logs

### Data not appearing in Google Sheets

1. **Check Sheet Name**: Ensure the sheet is named exactly "Leads" (case-sensitive)
2. **Check Permissions**: Verify the script has permission to edit the spreadsheet
3. **Check Headers**: Ensure the header row is in row 1
4. **Run Test Function**: In Apps Script, run `testFunction()` to verify the setup

### CORS Errors

1. **Use no-cors mode**: The code already uses `mode: 'no-cors'` which is required
2. **Check Script Deployment**: Ensure the script is deployed as a web app, not a library

---

## 📈 Advanced Features (Optional)

### Add Email Notifications

Add this to your Apps Script to receive email notifications:

```javascript
// Add this inside the doPost function, after appending the row
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'New Lead: ' + data.name,
  body: `
    New lead captured:
    Name: ${data.name}
    Email: ${data.email}
    Company: ${data.company}
    Message: ${data.message}
  `,
});
```

### Add Data Validation Rules

Add to your Apps Script to filter duplicates:

```javascript
// Check for duplicate emails (optional)
const existingEmails = sheet.getRange('C:C').getValues().flat();
if (existingEmails.includes(data.email)) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      success: false, 
      message: 'Email already exists' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 📝 Support

If you encounter any issues:

1. Check the [Google Apps Script Documentation](https://developers.google.com/apps-script)
2. Review the browser console for JavaScript errors
3. Check the Apps Script execution logs
4. Verify all URLs are correct and accessible

---

## ✅ Setup Checklist

- [ ] Google Spreadsheet created with proper headers
- [ ] Google Apps Script created and saved
- [ ] Script deployed as web app
- [ ] Web app URL copied and updated in `index.html`
- [ ] Form tested with valid data
- [ ] Data appearing in Google Sheets
- [ ] Success message displays correctly
- [ ] Error handling works properly

---

## 🎉 You're Done!

Your contact form is now integrated with Google Sheets and will automatically capture all leads from your website!

