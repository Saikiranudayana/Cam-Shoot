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
    console.log('--- Partner Submission Logic Start ---');
    try {
        const data = await request.json();

        // Debug: Check which vars are present (Do NOT log actual keys)
        console.log('Checking Environment Variables:');
        console.log('GOOGLE_EMAIL:', !!GOOGLE_SERVICE_ACCOUNT_EMAIL);
        console.log('GOOGLE_KEY:', !!GOOGLE_PRIVATE_KEY);
        console.log('GOOGLE_SHEET_ID:', !!GOOGLE_SHEET_ID);
        console.log('AIRTABLE_KEY:', !!AIRTABLE_API_KEY);

        // Strategy 1: Try Google Sheets
        if (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY && GOOGLE_SHEET_ID) {
            console.log('Attempting Google Sheets integration...');
            try {
                // Fix potential newline issues in private key
                const privateKey = GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n');
                console.log('Private Key formatted successfully. Length:', privateKey.length);

                const serviceAccountAuth = new JWT({
                    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    key: privateKey,
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });

                const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
                await doc.loadInfo();
                console.log('Connected to Google Sheet:', doc.title);

                const sheet = doc.sheetsByIndex[0];

                // Check headers
                await sheet.loadHeaderRow();
                if (sheet.headerValues.length === 0) {
                    console.log('Sheet is empty. Adding headers...');
                    await sheet.setHeaderRow([
                        'fullName', 'gender', 'whatsapp', 'email', 'portfolio',
                        'location', 'experience', 'ownKit', 'hasLaptop', 'hasVehicle', 'reason'
                    ]);
                }

                await sheet.addRow(data);
                console.log('Row added to Google Sheet successfully.');

                return NextResponse.json({ success: true, method: 'google-sheet' });
            } catch (sheetError) {
                console.error('❌ Google Sheet Error:', sheetError);
                // Continue to fallback
            }
        } else {
            console.log('Skipping Google Sheets: Missing credentials.');
        }

        // Strategy 2: Use Airtable
        if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID && AIRTABLE_API_KEY !== 'YOUR_AIRTABLE_PAT') {
            console.log('Attempting Airtable integration...');
            try {
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
                console.log('Row added to Airtable successfully.');
                return NextResponse.json({ success: true, method: 'airtable' });
            } catch (airtableError) {
                console.error('❌ Airtable Error:', airtableError);
            }
        }

        // Strategy 3: Console Log Fallback
        console.log('Fallback: Logging to console only.');
        console.log('Partner Application Data:', data);
        return NextResponse.json({ success: true, method: 'console-log' });

    } catch (error) {
        console.error('❌ General Partner API Error:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}
