// ============================================
// Google Apps Script — Paste this into your Google Sheets Apps Script editor
// ============================================
//
// SETUP STEPS:
// 1. Create a new Google Sheet in your Gmail account
// 2. Add these column headers in Row 1 (A1 through I1):
//    A: Timestamp
//    B: Student First Name
//    C: Student Last Name
//    D: Student Birthday
//    E: Guardian First Name
//    F: Guardian Last Name
//    G: Guardian Email
//    H: Guardian Phone
//    I: e-Transfer Sent
//
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code and paste THIS entire file
// 5. Click the floppy disk icon to save
// 6. Click Deploy > New Deployment
//    - Click the gear icon next to "Select type" and choose "Web app"
//    - Description: "Bootcamp Registration"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 7. Click "Deploy"
// 8. Authorize the app when prompted (click through the "unsafe" warning — it's your own script)
// 9. Copy the Web App URL
// 10. Paste the URL into script.js where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
//
// That's it! Form submissions will now appear as new rows in your Google Sheet.
// ============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Handle both form-encoded (e.parameter) and JSON (e.postData) submissions
    var data;
    if (e.parameter && e.parameter.studentFirstName) {
      data = e.parameter;
    } else {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      data.timestamp,
      data.studentFirstName,
      data.studentLastName,
      data.studentBirthday,
      data.guardianFirstName,
      data.guardianLastName,
      data.guardianEmail,
      data.guardianPhone,
      data.eTransferSent
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Bootcamp registration endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
