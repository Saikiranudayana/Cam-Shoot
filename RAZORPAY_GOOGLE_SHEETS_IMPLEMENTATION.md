# Razorpay + Google Sheets Integration Guide

## Complete End-to-End Payment & Order Tracking System

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Prerequisites & Setup](#prerequisites--setup)
3. [Razorpay Setup](#razorpay-setup)
4. [Google Sheets Setup](#google-sheets-setup)
5. [Implementation Steps](#implementation-steps)
6. [Security Best Practices](#security-best-practices)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 System Overview

### Complete Workflow

```
User Fills Booking Form
        ↓
Clicks "Pay Advance"
        ↓
Razorpay Payment Gateway Opens
        ↓
User Completes Payment
        ↓
Payment Success Callback
        ↓
Backend Verifies Payment
        ↓
Order Data Saved to Database (Optional)
        ↓
Order Data Sent to Google Sheets
        ↓
Confirmation Email Sent (Optional)
        ↓
User Sees Success Message
```

---

## 🔧 Prerequisites & Setup

### 1. Razorpay Account Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a free account
3. Complete KYC verification
4. Get your API keys:
   - Go to Settings → API Keys
   - Copy **Key ID** and **Key Secret**
   - Use **Test Mode** for development

### 2. Google Sheets Setup

#### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet named "CamShoot Orders"
3 Note the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

#### Step 2: Set up Sheet Headers

In Row 1, add these columns:
```
Order ID | Date & Time | Customer Name | Email | Phone | Package | Addons | Total Amount | Advance Paid | Payment ID | Payment Status | Event Date | Event Location | Special Requests
```

#### Step 3: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "CamShoot Orders"
3. Enable Google Sheets API:
   - APIs & Services → Library
   - Search "Google Sheets API"
   - Click Enable

#### Step 4: Create Service Account

1. Go to APIs & Services → Credentials
2. Click "Create Credentials" → "Service Account"
3. Name: "camshoot-orders-service"
4. Grant role: "Editor"
5. Click "Create Key" → JSON
6. Download the JSON file (keep it safe!)

#### Step 5: Share Sheet with Service Account

1. Open the JSON file you downloaded
2. Copy the `client_email` value (looks like: `xxx@xxx.iam.gserviceaccount.com`)
3. Go to your Google Sheet
4. Click "Share"
5. Paste the service account email
6. Give "Editor" permissions
7. Uncheck "Notify people"
8. Click "Share"

---

## 🔐 Environment Variables Setup

Create/Update `.env.local` file:

```env
# Razorpay Keys (Get from Razorpay Dashboard)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX

# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@xxx.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Optional: Database (Supabase/Firebase)
DATABASE_URL=your_database_url_here
```

**Important:** Get the private key from your downloaded JSON file. It should include the `\n` characters.

---

## 📦 Required Dependencies

### Install Razorpay SDK

```bash
npm install razorpay
```

### Install Google Sheets API Client

```bash
npm install googleapis
```

---

## 💻 Implementation Files

I'll create the following files for you:

### Backend Files

1. `/app/api/razorpay/create-order/route.ts` - Creates Razorpay order
2. `/app/api/razorpay/verify-payment/route.ts` - Verifies payment
3. `/app/api/save-order/route.ts` - Saves to Google Sheets
4. `/lib/razorpay.ts` - Razorpay helper functions
5. `/lib/googleSheets.ts` - Google Sheets helper functions

### Frontend Files

1. `/components/BookingModal.tsx` - Updated with Razorpay integration
2. `/utils/loadRazorpay.ts` - Razorpay script loader

---

## 🎨 Features Included

✅ Secure Razorpay payment integration  
✅ Payment verification (prevents tampering)  
✅ Automatic order ID generation  
✅ Google Sheets auto-sync  
✅ Payment success/failure handling  
✅ Order tracking system  
✅ Mobile-friendly payment flow  
✅ Error handling & retry logic  
✅ Production-ready code  

---

## 🔒 Security Best Practices

1. **Never expose Key Secret on frontend**
   - Always use backend API routes
   - Key Secret stays in `.env.local`

2. **Verify every payment**
   - Use Razorpay's signature verification
   - Don't trust client-side success

3. **Protect API routes**
   - Add rate limiting
   - Validate all inputs
   - Check payment amounts

4. **Secure Google Sheets credentials**
   - Keep service account JSON safe
   - Use environment variables only
   - Don't commit to Git

5. **Add `.env.local` to `.gitignore`**

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Switch to Razorpay Live Mode keys
- [ ] Complete Razorpay KYC verification
- [ ] Test payment flow end-to-end
- [ ] Verify Google Sheets sync
- [ ] Set up proper error logging
- [ ] Add payment confirmation emails
- [ ] Test on mobile devices
- [ ] Set up webhook for payment notifications

---

## 📊 Google Sheets Structure

Your sheet will automatically track:

| Column | Description |
|--------|-------------|
| Order ID | Unique identifier (e.g., ORD-1707895234567) |
| Date & Time | When order was placed |
| Customer Name | Full name |
| Email | Contact email |
| Phone | Contact number |
| Package | Selected package (PRO/PRO+/PRO MAX) |
| Addons | Selected add-ons (comma-separated) |
| Total Amount | Full package cost |
| Advance Paid | 50% advance amount |
| Payment ID | Razorpay payment ID |
| Payment Status | Success/Failed |
| Event Date | Shoot date |
| Event Location | Shoot location |
| Special Requests | Custom requirements |

---

## 🔍 Order Tracking

### Search by Order ID

Use Google Sheets filter or search to find orders:

1. Open Google Sheet
2. Use Ctrl+F (Windows) or Cmd+F (Mac)
3. Enter Order ID
4. View complete order details

### Track Payments

- Filter by "Payment Status" column
- Sort by "Date & Time"
- Calculate total revenue

---

## 📱 Mobile Experience

- Razorpay provides mobile-optimized checkout
- Supports UPI, Cards, Net Banking
- Works on all devices
- Instant payment confirmation

---

## ⚠️ Common Issues & Solutions

### Issue 1: Payment succeeds but not saving to sheets

**Solution:** Check service account permissions and sheet ID

### Issue 2: "Invalid key" error

**Solution:** Verify you're using the correct environment (Test vs Live)

### Issue 3: Orders not appearing in sheet

**Solution:** Check if service account has Editor access to sheet

### Issue 4: Payment signature mismatch

**Solution:** Ensure Key Secret is correctly set in environment variables

---

## 📧 Next Steps (Optional Enhancements)

1. **Email Notifications**
   - Send confirmation emails after payment
   - Use SendGrid or Resend

2. **SMS Notifications**
   - Send SMS using Twilio or MSG91

3. **Admin Dashboard**
   - View all orders
   - Download reports
   - Manage bookings

4. **Database Backup**
   - Add Supabase/Firebase integration
   - Automatic data backup

5. **Payment Webhooks**
   - Real-time payment updates
   - Handle delayed payments

---

## 📞 Support & Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Implementation Date**: February 13, 2026  
**Status**: Ready for Implementation  
**Estimated Setup Time**: 30-45 minutes
