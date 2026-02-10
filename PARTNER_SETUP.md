
# 🤝 Setting Up Partner Tracking (Google Sheets OR Airtable)

The "Become a Partner" form is live! You can track applications in **Google Sheets** (preferred) or **Airtable**.

---

## Option 1: Use Google Sheets (Recommended)
This requires more setup but syncs directly to a sheet.

1.  **Create a Project in Google Cloud Console**.
2.  Enable the **Google Sheets API**.
3.  Create a **Service Account**:
    *   Go to **IAM & Admin** > **Service Accounts**.
    *   Create new service account.
    *   Create a JSON key and download it.
4.  **Share Your Sheet**:
    *   Create a new Google Sheet.
    *   Share it with the `client_email` from your JSON key (e.g., `service-account@project.iam.gserviceaccount.com`) as "Editor".
    *   Copy the **Sheet ID** from the URL (the long string between `/d/` and `/edit`).
5.  **Add Environment Variables**:
    *   Open `.env.local`.
    *   Add these lines:
        ```env
        GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-email@...
        GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
        GOOGLE_SHEET_ID=your-sheet-id
        ```
    *   *(Note: For the private key, wrap it in quotes and use `\n` for newlines)*.

---

## Option 2: Use Airtable (Easier Fallback)
Since your app is already connected to Airtable, you can just add a new table.

1.  Go to your **"Event Shoot Bookings – MyCamShoot"** Base.
2.  Create a new Table named **"Partners"**.
3.  Add the following columns (Single Line Text for all):
    *   Full Name
    *   Gender
    *   WhatsApp Number
    *   Email Address
    *   Portfolio Link
    *   Location
    *   Experience (Reels)
    *   Own Kit
    *   Has Laptop
    *   Has Vehicle
    *   Reason
    *   Application Date

✅ **The form will automatically try Google Sheets first. If not configured, it will use Airtable.**
