import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
export const razorpayInstance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Generate unique order ID
export const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}${random}`;
};

// Verify Razorpay payment signature
export const verifyPaymentSignature = (
    orderId: string,
    paymentId: string,
    signature: string
): boolean => {
    try {
        const text = `${orderId}|${paymentId}`;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(text)
            .digest('hex');

        return generated_signature === signature;
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
};

// Create Razorpay order
export const createRazorpayOrder = async (amount: number, orderId: string) => {
    try {
        const order = await razorpayInstance.orders.create({
            amount: amount * 100, // Convert to paise (smallest currency unit)
            currency: 'INR',
            receipt: orderId,
            notes: {
                order_id: orderId,
            },
        });

        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
};

// Fetch payment details
export const getPaymentDetails = async (paymentId: string) => {
    try {
        const payment = await razorpayInstance.payments.fetch(paymentId);
        return payment;
    } catch (error) {
        console.error('Error fetching payment details:', error);
        throw error;
    }
};
