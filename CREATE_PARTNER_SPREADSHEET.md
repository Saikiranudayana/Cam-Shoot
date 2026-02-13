# 📋 Create Separate Google Sheet for Partner Applications

## 🎯 Quick Setup (5 Minutes)

Follow these exact steps to create a separate spreadsheet for partner applications.

---

## ✅ Step 1: Create New Google Sheet

1. **Open Google Sheets**
   - Go to: https://sheets.google.com
   
2. **Create New Sheet**
   - Click the **"+"** (Blank) button
   - Or click: **"Blank spreadsheet"**

3. **Name Your Sheet**
   - Click "Untitled spreadsheet" at the top
   - Rename to: **"CamShoot Partner Applications"**
   - Press Enter

---

## ✅ Step 2: Add Column Headers

**In Row 1, add these 14 headers:**

Click on cell **A1** and type:
```
Application ID
```

Then press **Tab** and continue for each column:

| Column | Header Name |
|--------|-------------|
| **A1** | Application ID |
| **B1** | Date & Time |
| **C1** | Full Name |
| **D1** | Gender |
| **E1** | WhatsApp |
| **F1** | Email |
| **G1** | Portfolio Link |
| **H1** | Location |
| **I1** | Experience |
| **J1** | Own Kit |
| **K1** | Has Laptop |
| **L1** | Has Vehicle |
| **M1** | Reason |
| **N1** | Status |

**Quick Copy/Paste Option:**

Select cell A1, then paste this (separated by tabs):
```
Application ID	Date & Time	Full Name	Gender	WhatsApp	Email	Portfolio Link	Location	Experience	Own Kit	Has Laptop	Has Vehicle	Reason	Status
```

---

## ✅ Step 3: Format the Headers (Optional but Recommended)

1. **Select Row 1** (click the "1" on the left)
2. **Make it Bold**: Click the **B** button in toolbar
3. **Background Color**: 
   - Click paint bucket icon
   - Choose a light gold/yellow color
4. **Freeze Header Row**:
   - Click **View** → **Freeze** → **1 row**

This keeps headers visible when you scroll!

---

## ✅ Step 4: Get Your Sheet ID

1. **Look at the URL** in your browser:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

2. **Copy the Sheet ID** (the long text between `/d/` and `/edit`)
   
   **Example:**
   ```
   https://docs.google.com/spreadsheets/d/1zDQ1HEYwYgN1jHMK6Vi-OjZFw0ZrNSKJgEmU7bY8J8w/edit
   ```
   The Sheet ID is: `1zDQ1HEYwYgN1jHMK6Vi-OjZFw0ZrNSKJgEmU7bY8J8w`

3. **Save this ID** - you'll need it in the next step!

---

## ✅ Step 5: Share with Service Account

1. **Click the "Share" button** (top right corner)

2. **In the "Add people and groups" field, paste:**
   ```
   camshoot-orders-service@poised-epigram-487306-e4.iam.gserviceaccount.com
   ```

3. **Set Permission**:
   - Click the dropdown (says "Viewer")
   - Select **"Editor"**

4. **Uncheck "Notify people"** (important!)

5. **Click "Share"**

6. You should see a message: "Link sharing off - Only people added can open"

---

## ✅ Step 6: Add Sheet ID to Environment Variables

1. **Open your `.env.local` file** in VS Code

2. **Add this line at the end:**
   ```env
   # Partner Google Sheets
   GOOGLE_SHEETS_PARTNER_SPREADSHEET_ID=PASTE_YOUR_SHEET_ID_HERE
   ```

3. **Replace `PASTE_YOUR_SHEET_ID_HERE`** with the Sheet ID you copied in Step 4

   **Example:**
   ```env
   # Partner Google Sheets
   GOOGLE_SHEETS_PARTNER_SPREADSHEET_ID=1zDQ1HEYwYgN1jHMK6Vi-OjZFw0ZrNSKJgEmU7bY8J8w
   ```

4. **Save the file** (Ctrl+S)

---

## ✅ Step 7: Restart Development Server

1. **Go to your terminal** (where `npm run dev` is running)

2. **Stop the server**:
   - Press **Ctrl+C**

3. **Start it again**:
   ```bash
   npm run dev
   ```

4. **Wait for**: `Local: http://localhost:3000`

---

## ✅ Step 8: Test Partner Form

1. **Open your website**: http://localhost:3000

2. **Navigate to Partner Form** (wherever it's displayed on your site)

3. **Fill the form with test data**:
   - Full Name: `Test Partner`
   - Gender: `Male`
   - WhatsApp: `+91 9876543210`
   - Email: `test@partner.com`
   - Portfolio: `https://instagram.com/test`
   - Location: `Hyderabad`
   - Experience: `Yes`
   - Own Kit: `Yes`
   - Has Laptop: `Yes`
   - Has Vehicle: `Yes`
   - Reason: `Testing partner application system`

4. **Click "Apply Now"**

5. **Watch the terminal** - you should see:
   ```
   📥 Received partner application: { fullName, gender, ... }
   📊 Prepared partner data for Google Sheets: { applicationId: "APP-...", ... }
   💾 Saving partner application to Google Sheets...
   ✅ Successfully saved partner application to Google Sheets!
   ```

6. **Check your Google Sheet** - you should see a new row with:
   - Application ID starting with `APP-`
   - Current date & time
   - All the form data
   - Status: `Pending Review`

7. **On the website**, you should see:
   - ✓ Green checkmark
   - "Application Submitted Successfully! 🎉"
   - Application ID displayed
   - Success message

---

## 🎉 Success Checklist

After completing all steps, verify:

- [ ] ✅ New Google Sheet created
- [ ] ✅ Sheet named "CamShoot Partner Applications"
- [ ] ✅ Row 1 has 14 column headers
- [ ] ✅ Sheet ID copied
- [ ] ✅ Service account added with Editor permission
- [ ] ✅ Sheet ID added to `.env.local`
- [ ] ✅ Server restarted
- [ ] ✅ Test form submitted
- [ ] ✅ Terminal shows success emojis (📥📊💾✅)
- [ ] ✅ New row appears in Google Sheet
- [ ] ✅ Application ID starts with "APP-"
- [ ] ✅ Success message shows on website

---

## 🐛 Troubleshooting

### Issue: "Permission denied" error

**Solution:**
1. Check service account email is correct (copy from above)
2. Make sure permission is set to "Editor"
3. Service account should show in the Share dialog

### Issue: Terminal shows error

**Solution:**
1. Check Sheet ID is correct in `.env.local`
2. Make sure no spaces before/after the Sheet ID
3. Restart server after changing `.env.local`

### Issue: Sheet not updating

**Solution:**
1. Verify service account has Editor access
2. Check Sheet ID matches the URL
3. Look at terminal for specific error message

### Issue: Application ID not showing

**Solution:**
1. Check browser console (F12) for errors
2. Make sure API returned success
3. Try clearing browser cache

---

## 📊 Your Spreadsheet Structure

After the first test application, your sheet will look like:

| Application ID | Date & Time | Full Name | Gender | WhatsApp | Email | Portfolio Link | Location | Experience | Own Kit | Has Laptop | Has Vehicle | Reason | Status |
|----------------|-------------|-----------|--------|----------|-------|----------------|----------|------------|---------|------------|-------------|--------|--------|
| APP-1707901234567 | 13/02/2026, 12:55:00 PM | Test Partner | Male | +91 9876543210 | test@partner.com | https://instagram.com/test | Hyderabad | Yes | Yes | Yes | Yes | Testing... | Pending Review |

---

## 🎯 What Happens Automatically

Every time someone submits the partner form:

1. ✅ **Unique Application ID** generated (APP-timestamp)
2. ✅ **Current date & time** recorded (IST timezone)
3. ✅ **All form data** saved to Google Sheet
4. ✅ **Status** set to "Pending Review"
5. ✅ **Applicant sees** success message with Application ID
6. ✅ **You get** organized data in spreadsheet

---

## 📝 Next Steps After Setup

Once partner applications start coming in:

1. **Review Applications**
   - Open Google Sheet daily
   - Check new applications (Status = "Pending Review")

2. **Update Status**
   - Change Status column as you process:
     - "Under Review"
     - "Shortlisted"
     - "Approved"
     - "Rejected"

3. **Contact Applicants**
   - Use WhatsApp number or email from the sheet
   - Reference their Application ID

4. **Track Progress**
   - Filter by Status
   - Sort by Date & Time
   - Search by Location, Experience, etc.

---

## 🔐 Security Note

- ✅ Service account has access ONLY to sheets you explicitly share
- ✅ Private key is stored only in your `.env.local` (never commit to Git!)
- ✅ Applicant data is protected and only you can see it

---

**You're all set!** 🎉

Your partner application system is now fully integrated with Google Sheets!
