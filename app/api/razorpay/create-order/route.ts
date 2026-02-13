import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, generateOrderId } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Generate unique order ID
        const orderId = generateOrderId();

        // Create Razorpay order
        const order = await createRazorpayOrder(amount, orderId);

        return NextResponse.json({
            success: true,
            orderId: order.id,
            customOrderId: orderId,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
