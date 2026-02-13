# Testing Guide - Razorpay Integration

## 🧪 Complete Testing Checklist

---

## Pre-Testing Setup

### 1. Verify Dependencies Installed
```bash
npm list razorpay googleapis
```
Should show both packages installed.

### 2. Verify Environment Variables
Create `.env.local` file with:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@xxx.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3. Restart Development Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## Test Scenarios

### Test 1: Razorpay Order Creation

**API**: `/api/razorpay/create-order`

**Test with curl**:
```bash
curl -X POST http://localhost:3000/api/razorpay/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000}'
```

**Expected Response**:
```json
{
  "success": true,
  "orderId": "order_XXXXXXXXXXXX",
  "customOrderId": "ORD-1707895234567",
  "amount": 500000,
  "currency": "INR"
}
```

✅ **Pass Criteria**:
- Returns `success: true`
- `orderId` starts with `order_`
- `customOrderId` starts with `ORD-`
- `amount` is in paise (5000 × 100 = 500000)

---

### Test 2: Payment Verification

**API**: `/api/razorpay/verify-payment`

**Test Steps**:
1. Complete a test payment
2. Get `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`
3. Send to verification endpoint

**Test with curl** (replace with actual values):
```bash
curl -X POST http://localhost:3000/api/razorpay/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_XXXXXXXXXXXX",
    "razorpay_payment_id": "pay_XXXXXXXXXXXX",
    "razorpay_signature": "XXXXXXXXXXXX"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "verified": true,
  "paymentId": "pay_XXXXXXXXXXXX",
  "orderId": "order_XXXXXXXXXXXX",
  "amount": 5000,
  "status": "captured",
  "method": "card"
}
```

✅ **Pass Criteria**:
- `verified: true`
- `status: "captured"`
- Amount matches original

---

### Test 3: Google Sheets Integration

**Test Manually**:
1. Go to http://localhost:3000
2. Click "Book Now"
3. Complete the booking form:
   - Select package
   - Add addons
   - Fill personal details
   - Fill event details
4. Click "Pay Advance"
5. In Razorpay modal, use test card:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/25`
6. Complete payment
7. Check your Google Sheet

✅ **Pass Criteria**:
- New row appears in Google Sheet
- All data fields are populated correctly
- Order ID is unique
- Payment ID matches Razorpay transaction
- Timestamp is in IST

---

### Test 4: End-to-End Booking Flow

**Complete User Journey**:

1. **Open Website**
   ```
   http://localhost:3000
   ```

2. **Click "Book Now" Button**
   - Booking modal should open
   - Step 1 visible (Package selection)

3. **Select Package**
   - Choose "PRO", "PRO+", or "PRO MAX"
   - Price should update

4. **Select Addons**
   - Toggle addons on/off
   - Total should update correctly

5. **Click "Next"**
   - Should move to Step 2 (not used in current flow)
   - Or directly to Step 3

6. **Fill Personal Details**
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: +91 9876543210

7. **Fill Event Details**
   - Event Type: Wedding
   - Date: Tomorrow's date
   - Time: 10:00 AM
   - Location: Hyderabad
   - City: Telangana

8. **Click "Next"**
   - Should move to Review/Payment step
   - Check all details displayed correctly

9. **Agree to Terms**
   - Check the terms checkbox
   - "Pay Advance" button should activate

10. **Click "Pay Advance"**
    - Razorpay modal should open
    - Amount should be 50% of total

11. **Complete Payment**
    - Use test card: 4111 1111 1111 1111
    - CVV: 123
    - Expiry: 12/25
    - Click "Pay"

12. **Verify Success**
    - Success alert should show
    - Order ID displayed
    - Payment ID displayed
    - Modal should close

13. **Check Google Sheet**
    - Open your Google Sheet
    - Verify new row with order
    - All fields populated

✅ **Complete Flow Pass Criteria**:
- All steps complete without errors
- Payment successful
- Order saved to Google Sheets
- Order ID matches across systems

---

## Razorpay Test Cards

### Test Success Scenarios

| Payment Method | Details | Expected Result |
|----------------|---------|-----------------|
| **Domestic Card** | 4111 1111 1111 1111 | ✅ Success |
| **International Card** | 5555 5555 5555 4444 | ✅ Success |
| **American Express** | 3782 822463 10005 | ✅ Success |
| **UPI** | success@razorpay | ✅ Success |
| **Net Banking** | Any bank (test mode) | ✅ Success |

### Test Failure Scenarios

| Payment Method | Details | Expected Result |
|----------------|---------|-----------------|
| **Failed Card** | 4111 1111 1111 1234 | ❌ Payment Failed |
| **UPI Failure** | failure@razorpay | ❌ Payment Failed |

### Card Details Format
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry**: Any future date (e.g., 12/25)
- **Name**: Any name

---

## Error Testing

### Test 1: Invalid Amount
```bash
curl -X POST http://localhost:3000/api/razorpay/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 0}'
```

**Expected**: Error response

### Test 2: Missing Fields
**Steps**:
1. Open booking modal
2. Leave fields empty
3. Try to proceed

**Expected**: Validation errors

### Test 3: Invalid Email
**Steps**:
1. Enter email without @
2. Try to proceed

**Expected**: Email validation error

### Test 4: Google Sheets Not Configured
**Steps**:
1. Remove `GOOGLE_SHEETS_SPREADSHEET_ID` from `.env.local`
2. Complete payment

**Expected**: Payment succeeds but order saving fails gracefully

---

## Performance Testing

### Test Load Time
1. Open browser DevTools (F12)
2. Go to Network tab
3. Load Razorpay script
4. Should load in < 1 second

### Test Modal Response
1. Click "Pay Advance"
2. Razorpay modal should open in < 2 seconds

### Test Order Save Speed
1. Complete payment
2. Order should save to Google Sheets in < 3 seconds

---

## Mobile Testing

### Test on Mobile Devices

1. **Open on Mobile**
   - Use same WiFi network
   - Go to: `http://YOUR_IP:3000`
   - Find IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)

2. **Test Booking Flow**
   - Fill form on mobile
   - Payment modal should be mobile-optimized
   - UPI option should be available

3. **Test Payment Methods**
   - Card payment
   - UPI payment (use success@razorpay)
   - Net Banking

✅ **Pass Criteria**:
- Form is responsive
- Razorpay modal is mobile-friendly
- All payment methods work
- Success confirmation shows

---

## Security Testing

### Test 1: API Key Not Exposed
```bash
# Check if secret key is in frontend
curl http://localhost:3000 | grep "RAZORPAY_KEY_SECRET"
```

**Expected**: Should NOT find the secret key

### Test 2: Payment Signature Tampering
**Steps**:
1. Capture a successful payment response
2. Modify the `razorpay_signature`
3. Send to verification endpoint

**Expected**: Verification should fail

### Test 3: Environment Variables
**Check**:
```bash
# This should fail (not publicly accessible)
curl http://localhost:3000/api/env
```

**Expected**: 404 or error

---

## Google Sheets Testing

### Test 1: Sheet Access
1. Open your Google Sheet
2. Check if data appears after payment

### Test 2: Multiple Orders
1. Complete 3-5 test bookings
2. Each should create a new row
3. Order IDs should be unique

### Test 3: Data Accuracy
Compare data in sheet with booking details:
- ✅ Customer name matches
- ✅ Email matches
- ✅ Phone matches
- ✅ Package matches
- ✅ Total amount matches
- ✅ Advance amount is 50% of total

---

## Browser Compatibility

Test on multiple browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Debugging Tools

### 1. Check Razorpay Dashboard
- Go to https://dashboard.razorpay.com
- Check "Payments" tab
- Verify test payments appear

### 2. Check Browser Console
- Open DevTools (F12)
- Look for JavaScript errors
- Check Network tab for failed requests

### 3. Check Server Logs
- Watch terminal where `npm run dev` is running
- Look for error messages

### 4. Test API Endpoints Directly
Use Postman or curl to test APIs independently

---

## Troubleshooting Common Issues

### Issue: Razorpay script not loading
**Solution**:
```javascript
// Check in browser console
console.log(typeof Razorpay);
// Should output: "function"
```

### Issue: Google Sheets not updating
**Solution**:
1. Check service account has Editor access
2. Verify `GOOGLE_SHEETS_SPREADSHEET_ID` is correct
3. Check sheet name (should be "Sheet1" or update code)

### Issue: Payment verification fails
**Solution**:
1. Verify `RAZORPAY_KEY_SECRET` is correct
2. Check if key has extra spaces
3. Ensure using test mode keys

---

## Success Metrics

At the end of testing, you should have:

- [ ] ✅ 5+ successful test payments
- [ ] ✅ All payments verified
- [ ] ✅ All orders in Google Sheets
- [ ] ✅ Unique Order IDs for each
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Works on multiple browsers
- [ ] ✅ Failed payment handled gracefully
- [ ] ✅ Data accuracy 100%
- [ ] ✅ Security tests passed

---

## Production Readiness Checklist

Before going live:

- [ ] Complete Razorpay KYC verification
- [ ] Switch to live API keys
- [ ] Test with real money (small amount)
- [ ] Setup payment webhooks
- [ ] Add email notifications
- [ ] Setup error logging
- [ ] Backup Google Sheet
- [ ] Document order tracking process
- [ ] Train team on order management

---

**Testing Complete!** 🎉

Once all tests pass, you're ready to go live!

---

**Last Updated**: February 13, 2026  
**Version**: 1.0
