
# 📸 Integrating Airtable with MyCamShoot - Quick Start Guide

You have successfully set up the codebase to use Airtable as your backend!

## 1. Get Your Airtable Credentials
1.  **Create a New Base**: Go to [Airtable](https://airtable.com) and create a base named **"Event Shoot Bookings – MyCamShoot"**.
2.  **Get API Key (PAT)**:
    *   Go to **Developer Hub** -> **Personal Access Tokens**.
    *   Create a token with scopes: `data.records:read`, `data.records:write`.
    *   Give access to your new base.
    *   Copy the token (starts with `pat...`).
3.  **Get Base ID**: Open your base in the browser. The URL looks like `https://airtable.com/appXXXXXXXXXXXXXX/tbl...`. The `app...` part is your **Base ID**.
4.  **Table Name**: Ensure your main table is named **"Bookings"**.

## 2. Set Up the Table Columns (Exact Names Required)
Create the following columns in your "Bookings" table. The field types must match or text/number will work for most.

| Field Name | Type |
| :--- | :--- |
| **First Name** | Single line text |
| **Last Name** | Single line text |
| **Phone Number** | Phone number |
| **Email Address** | Email |
| **Package Selected** | Single Select (PRO, PRO+, PRO MAX) |
| **Base Package Price** | Currency |
| **Event Type** | Single Select |
| **Event Date** | Date |
| **Event Time** | Single line text (or Time) |
| **Event Location** | Long text |
| **Drone Shoot** | Checkbox |
| **Extra Hour** | Checkbox |
| **Extra Video** | Checkbox |
| **Add-ons Cost** | Currency |
| **Special Notes / Requirements** | Long text |
| **Total Amount** | Currency |
| **Advance Paid (50%)** | Currency |
| **Payment Method** | Single Select |
| **Payment Status** | Single Select (Pending, Paid (Advance), Fully Paid) |
| **Razorpay Payment ID** | Single line text |
| **Booking Status** | Single Select (New, Confirmed, etc.) |
| **Booking Date** | Created time |

## 3. Connect Your App
1.  Open `.env.local` in your project root.
2.  Paste your credentials:
    ```env
    AIRTABLE_API_KEY=pat...
    AIRTABLE_BASE_ID=app...
    AIRTABLE_TABLE_NAME=Bookings
    ```
3.  Restart your server: `npm run dev`.

## 4. Mobile Views (In Airtable)
Create these Views in Airtable interface for easy mobile management:
1.  **Today’s Shoots**: Filter `Event Date` IS `Today`.
2.  **Pending Payments**: Filter `Payment Status` IS NOT `Fully Paid`.
3.  **Upcoming Events**: Filter `Event Date` IS AFTER `Today`.

✅ **That's it! Your website will now automatically sync all bookings to Airtable.**
