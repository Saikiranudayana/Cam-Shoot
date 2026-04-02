import Razorpay from 'razorpay';
import crypto from 'crypto';

let razorpayInstance: Razorpay | null = null;

const getRazorpayKeyId = (): string | undefined => {
    return process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
};

// Initialize Razorpay instance lazily
const getRazorpayInstance = () => {
    if (!razorpayInstance) {
        const keyId = getRazorpayKeyId();
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            throw new Error('Razorpay keys are missing. Set RAZORPAY_KEY_ID (or NEXT_PUBLIC_RAZORPAY_KEY_ID) and RAZORPAY_KEY_SECRET.');
        }

        razorpayInstance = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
    }
    return razorpayInstance;
};

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
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
        console.error('RAZORPAY_KEY_SECRET is missing during signature verification');
        return false;
    }

    try {
        const text = `${orderId}|${paymentId}`;
        const generated_signature = crypto
            .createHmac('sha256', keySecret)
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
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error('Invalid order amount received');
        }

        const instance = getRazorpayInstance();
        const amountInPaise = Math.round(amount * 100);

        const order = await instance.orders.create({
            amount: amountInPaise,
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
        const instance = getRazorpayInstance();
        const payment = await instance.payments.fetch(paymentId);
        return payment;
    } catch (error) {
        console.error('Error fetching payment details:', error);
        throw error;
    }
};
