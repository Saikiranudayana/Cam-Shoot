import { NextRequest, NextResponse } from 'next/server';
import { saveOrderToGoogleSheets, OrderData } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log('📥 Received order data:', JSON.stringify(body, null, 2));

        // Validate required nested fields
        if (!body.orderId || !body.userDetails || !body.eventDetails || !body.packageName ||
            !body.totalAmount || !body.advancePaid || !body.paymentId) {
            console.error('❌ Missing required fields:', {
                orderId: !!body.orderId,
                userDetails: !!body.userDetails,
                eventDetails: !!body.eventDetails,
                packageName: !!body.packageName,
                totalAmount: !!body.totalAmount,
                advancePaid: !!body.advancePaid,
                paymentId: !!body.paymentId
            });
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Prepare order data for Google Sheets
        const orderData: OrderData = {
            orderId: body.orderId,
            dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            customerName: `${body.userDetails.firstName} ${body.userDetails.lastName}`,
            email: body.userDetails.email,
            phone: body.userDetails.phone,
            packageName: body.packageName,
            addons: Array.isArray(body.addons) && body.addons.length > 0 ? body.addons.join(', ') : 'None',
            totalAmount: body.totalAmount,
            advancePaid: body.advancePaid,
            paymentId: body.paymentId,
            paymentStatus: body.paymentStatus || 'Success',
            eventDate: body.eventDetails.date || 'Not specified',
            eventLocation: body.eventDetails.location && body.eventDetails.city
                ? `${body.eventDetails.location}, ${body.eventDetails.city}`
                : body.eventDetails.location || 'Not specified',
            specialRequests: body.eventDetails.specialReq || 'None',
        };

        console.log('📊 Prepared order data for Google Sheets:', orderData);

        // Save to Google Sheets
        console.log('💾 Saving to Google Sheets...');
        await saveOrderToGoogleSheets(orderData);
        console.log('✅ Successfully saved to Google Sheets!');

        return NextResponse.json({
            success: true,
            message: 'Order saved successfully',
            orderId: orderData.orderId,
        });
    } catch (error) {
        console.error('❌ Error saving order:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json(
            {
                error: 'Failed to save order',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve order by ID
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        // You can implement getOrderFromGoogleSheets here if needed
        return NextResponse.json({
            success: true,
            message: 'Order retrieval not yet implemented',
        });
    } catch (error) {
        console.error('Error retrieving order:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve order' },
            { status: 500 }
        );
    }
}
