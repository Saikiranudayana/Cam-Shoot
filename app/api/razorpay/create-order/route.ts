import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, generateOrderId } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount } = body;
        const parsedAmount = Number(amount);

        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Generate unique order ID
        const orderId = generateOrderId();

        // Create Razorpay order
        const order = await createRazorpayOrder(parsedAmount, orderId);

        return NextResponse.json({
            success: true,
            orderId: order.id,
            customOrderId: orderId,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        const message = error instanceof Error ? error.message : 'Failed to create order';
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
