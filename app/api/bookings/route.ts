import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Bookings';

export async function GET() {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        // Fallback for demo if env vars are missing
        console.warn("Airtable credentials missing. Returning empty list.");
        return NextResponse.json([]);
    }

    try {
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        const records = await base(AIRTABLE_TABLE_NAME).select({
            maxRecords: 100,
            sort: [{ field: "Booking Date", direction: "desc" }]
        }).firstPage();

        const bookings = records.map((record: any) => ({
            id: record.id,
            createdAt: record.get('Booking Date') || new Date().toISOString(),
            userDetails: {
                firstName: record.get('First Name'),
                lastName: record.get('Last Name'),
                email: record.get('Email Address'),
                phone: record.get('Phone Number')
            },
            eventDetails: {
                type: record.get('Event Type'),
                date: record.get('Event Date'),
                time: record.get('Event Time'),
                location: record.get('Event Location'),
                specialReq: record.get('Special Notes / Requirements')
            },
            packageName: record.get('Package Selected'),
            totalAmount: record.get('Total Amount'),
            advanceAmount: record.get('Advance Paid (50%)'),
            status: record.get('Booking Status'),
            addons: [] // Simplified for viewing
        }));

        return NextResponse.json(bookings);

    } catch (error) {
        console.error('Airtable Fetch Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return NextResponse.json({ error: 'Airtable not configured' }, { status: 500 });
    }

    try {
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        const body = await request.json();
        const {
            userDetails,
            eventDetails,
            packageName,
            packagePrice,
            addons,
            totalAmount,
            advanceAmount,
            paymentMethod,
            status
        } = body;

        // Calculate Add-ons Cost
        const addonsCost = (totalAmount || 0) - (packagePrice || 0);

        const fields = {
            "First Name": userDetails.firstName,
            "Last Name": userDetails.lastName,
            "Phone Number": userDetails.phone,
            "Email Address": userDetails.email,
            "Package Selected": packageName,
            "Base Package Price": packagePrice,
            "Event Type": eventDetails.type,
            "Event Date": eventDetails.date,
            "Event Time": eventDetails.time,
            "Event Location": eventDetails.location,
            "Drone Shoot": addons?.includes('drone') || false,
            "Extra Hour": addons?.includes('extra_hour') || false,
            "Extra Video": addons?.includes('extra_video') || false,
            "Add-ons Cost": addonsCost > 0 ? addonsCost : 0,
            "Special Notes / Requirements": eventDetails.specialReq || '',
            "Total Amount": totalAmount,
            "Advance Paid (50%)": advanceAmount,
            "Payment Method": paymentMethod || 'Razorpay',
            "Payment Status": status || 'Pending',
            "Razorpay Payment ID": 'pay_' + Math.random().toString(36).substr(2, 9),
            "Booking Status": "New"
        };

        const records = await base(AIRTABLE_TABLE_NAME).create([
            { fields }
        ]);

        return NextResponse.json({ success: true, booking: { id: records[0].id } });
    } catch (error) {
        console.error('Airtable Create Error:', error);
        return NextResponse.json({ success: false, error: 'Airtable Error' }, { status: 500 });
    }
}
