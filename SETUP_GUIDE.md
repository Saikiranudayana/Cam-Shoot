# Quick Start Guide: Razorpay + Google Sheets Integration

## 🚀 30-Minute Setup  Checklist

### Step 1: Install Dependencies (✅ DONE)

```bash
npm install razorpay googleapis
```

### Step 2: Setup Razorpay Account (5 minutes)

1. **Create Account**
   - Go to https://dashboard.razorpay.com/signup
   - Sign up with email and phone
   - Verify email and phone number

2. **Get API Keys**
   - Login to dashboard
   - Go to Settings → API Keys
   - Click "Generate Test Key"
   - Copy:
     - `Key ID` (starts with `rzp_test_`)
     - `Key Secret` (keep this secret!)

3. **Enable Test Mode**
   - Make sure you're in "Test Mode" (toggle at top)
   - Test mode doesn't charge real money

### Step 3: Setup Google Sheets (10 minutes)

1. **Create Google Sheet**
   - Go to https://sheets.google.com
   - Create new sheet
   - Name it: "CamShoot Orders"
   - Add headers in Row 1:
     ```
     Order ID | Date & Time | Customer Name | Email | Phone | Package | Addons | Total Amount | Advance Paid | Payment ID | Payment Status | Event Date | Event Location | Special Requests
     ```
   - Note the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

2. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com/
   - Click "New Project"
   - Name: "CamShoot Orders"
   - Click "Create"

3. **Enable Google Sheets API**
   - In Cloud Console, go to "APIs & Services" → "Library"
   - Search: "Google Sheets API"
   - Click "Enable"

4. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: "camshoot-orders-service"
   - Click "Create and Continue"
   - Role: Select "Editor"
   - Click "Done"

5. **Create Service Account Key**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Select "JSON"
   - Click "Create"
   - **Download the JSON file** (keep it safe!)

6. **Share Sheet with Service Account**
   - Open the JSON file you downloaded
   - Find `client_email` (looks like: `xxx@xxx.iam.gserviceaccount.com`)
   - Copy the email
   - Go back to your Google Sheet
   - Click "Share" button
   - Paste the service account email
   - Give "Editor" access
   - Uncheck "Notify people"
   - Click "Share"

### Step 4: Configure Environment Variables (5 minutes)

1. **Copy the example file**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in Razorpay credentials**
   - Open `.env.local`
   - Replace `rzp_test_XXXXXXXXXXXX` with your Razorpay Key ID
   - Replace the Key Secret line with your actual secret

3. **Fill in Google Sheets credentials**
   - Open the downloaded JSON file
   - Copy `client_email` value → paste in `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy the Sheet ID from your Google Sheet URL → paste in `GOOGLE_SHEETS_SPREADSHEET_ID`
   - Copy the entire `private_key` value (including `-----BEGIN` and `-----END`) → paste in `GOOGLE_PRIVATE_KEY`
   - **Important**: Keep the `\n` characters in the private key!

Example `.env.local`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_AbCdEfGhIjKlMn
RAZORPAY_KEY_SECRET=XyZ123456789aBcDeFgHiJkL

GOOGLE_SHEETS_SPREADSHEET_ID=1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9YzA
GOOGLE_SERVICE_ACCOUNT_EMAIL=camshoot-orders-service@camshoot-orders-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIB...(rest of key)...=\n-----END PRIVATE KEY-----\n"
```

### Step 5: Update BookingModal Component (5 minutes)

Replace your payment handler in `BookingModal.tsx`:

**Find this code (around line 176-210):**
```tsx
const handlePayment = async () => {
    if (!agreedToTerms) return;
    
    // Old simulation code
    const confirmed = window.confirm(`Proceed to pay...`);
    // ...
};
```

**Replace with:**
```tsx
const handlePayment = async () => {
    if (!agreedToTerms) return;

    try {
        // Load Razorpay script
        const { loadRazorpayScript } = await import('@/utils/loadRazorpay');
        const loaded = await loadRazorpayScript();

        if (!loaded) {
            alert('Failed to load payment gateway. Please try again.');
            return;
        }

        // Create Razorpay order
        const orderResponse = await fetch('/api/razorpay/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: advanceAmount })
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
            alert('Failed to create order. Please try again.');
            return;
        }

        // Razorpay checkout options
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'CamShoot',
            description: `${currentPackage.name} Package - Advance Payment`,
            order_id: orderData.orderId,
            handler: async function (response: any) {
                // Payment success - verify and save
                try {
                    // Verify payment
                    const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.verified) {
                        // Save order to Google Sheets
                        await fetch('/api/save-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderId: orderData.customOrderId,
                                packageName: currentPackage.name,
                                packagePrice: currentPackage.price,
                                addons: selectedAddons,
                                totalAmount,
                                advancePaid: advanceAmount,
                                userDetails,
                                eventDetails,
                                paymentId: response.razorpay_payment_id,
                                paymentStatus: 'Success'
                            })
                        });

                        // Show success message
                        alert(`✅ Payment Successful!\n\nOrder ID: ${orderData.customOrderId}\nPayment ID: ${response.razorpay_payment_id}\n\nYour booking has been confirmed!`);
                        closeBooking();
                        
                        // Optional: Redirect to success page
                        // window.location.href = `/success?orderId=${orderData.customOrderId}`;
                    } else {
                        alert('Payment verification failed. Please contact support.');
                    }
                } catch (error) {
                    console.error('Error saving order:', error);
                    alert('Payment successful but failed to save order. Please contact support with your payment ID.');
                }
            },
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
                contact: userDetails.phone
            },
            theme: {
                color: '#D4AF37' // Gold color matching your theme
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment modal closed');
                }
            }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();

    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
    }
};
```

### Step 6: Test the Integration (5 minutes)

1. **Restart your development server**
   ```bash
   # Press Ctrl+C to stop the server
   npm run dev
   ```

2. **Test the booking flow**
   - Open http://localhost:3000
   - Click "Book Now"
   - Fill in the booking form
   - Click "Pay Advance"
   - Razorpay modal should open

3. **Use Razorpay test cards**
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - Or click "UPI" and use: `success@razorpay`

4. **Verify the order**
   - Check your Google Sheet
   - New row should appear with order details
   - Order ID should be unique

### Step 7: Security Check

1. **Verify .gitignore includes .env.local**
   ```bash
   # Check if .env.local is ignored
   git check-ignore .env.local
   ```
   - Should output: `.env.local`
   - If not, add to `.gitignore`:
     ```
     .env.local
     .env.*.local
     ```

2. **Never commit sensitive keys**
   - Keys should only be in `.env.local`
   - Share `.env.local.example` instead

---

## ✅ Success Checklist

- [ ] Razorpay account created
- [ ] API keys added to `.env.local`
- [ ] Google Sheet created with headers
- [ ] Service account created
- [ ] Service account has access to sheet
- [ ] `.env.local` configured correctly
- [ ] BookingModal updated with payment code
- [ ] Test payment completed successfully
- [ ] Order appears in Google Sheet
- [ ] `.env.local` added to `.gitignore`

---

## 🎯 Next Steps

### For Production:

1. **Complete Razorpay KYC**
   - Submit business documents
   - Get approved for live mode

2. **Switch to Live Keys**
   - Replace test keys with live keys
   - Test with real money (small amount)

3. **Add Email Notifications**
   - Setup SendGrid or Resend
   - Send confirmation emails

4. **Setup Webhooks**
   - For real-time payment updates
   - Handle failed payments

5. **Add Admin Dashboard**
   - View all orders
   - Export reports
   - Track payments

---

## 🆘 Common Issues

### Issue: "Invalid key" error
**Solution**: Make sure you copied the correct key from Razorpay dashboard

### Issue: Order not saving to Google Sheets
**Solution**: Check if service account email has Editor access to the sheet

### Issue: "Private key" error
**Solution**: Make sure to keep the `\n` characters in the private key

### Issue: Payment succeeds but not verified
**Solution**: Check that Key Secret is correctly set in `.env.local`

---

## 📞 Support

- **Razorpay Docs**: https://razorpay.com/docs/
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Tutorial Videos**: Search "Razorpay Next.js integration"

---

**Setup Time**: ~30 minutes  
**Difficulty**: Moderate  
**Status**: Ready to implement  
**Last Updated**: February 13, 2026
