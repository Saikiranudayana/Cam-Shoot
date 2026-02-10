import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import Airtable from 'airtable';

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_PARTNERS_TABLE = 'Partners'; // Ensure this table exists in Airtable

// Google Sheets Env Vars (Optional - if user wants direct sheet integration)
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Strategy 1: Try Google Sheets if configured
        if (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY && GOOGLE_SHEET_ID) {
            try {
                const serviceAccountAuth = new JWT({
                    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });

                const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
                await doc.loadInfo();
                const sheet = doc.sheetsByIndex[0]; // Assumes first sheet
                await sheet.addRow(data);

                return NextResponse.json({ success: true, method: 'google-sheet' });
            } catch (sheetError) {
                console.error('Google Sheet Error:', sheetError);
                // Fallback to Airtable if Sheet fails? Or just continue
            }
        }

        // Strategy 2: Use Airtable (Since it's already set up for bookings)
        // This is much easier for the user since they already have the key/base
        if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
            const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

            await base(AIRTABLE_PARTNERS_TABLE).create([
                {
                    fields: {
                        'Full Name': data.fullName,
                        'Gender': data.gender,
                        'WhatsApp Number': data.whatsapp,
                        'Email Address': data.email,
                        'Portfolio Link': data.portfolio,
                        'Location': data.location,
                        'Experience (Reels)': data.experience,
                        'Own Kit': data.ownKit,
                        'Has Laptop': data.hasLaptop,
                        'Has Vehicle': data.hasVehicle,
                        'Reason': data.reason,
                        'Application Date': new Date().toISOString()
                    }
                }
            ]);

            return NextResponse.json({ success: true, method: 'airtable' });
        }

        // Strategy 3: Log to console if no backend configured (Dev mode)
        console.log('Partner Application Received:', data);
        return NextResponse.json({ success: true, method: 'console-log' });

    } catch (error) {
        console.error('Partner API Error:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}
