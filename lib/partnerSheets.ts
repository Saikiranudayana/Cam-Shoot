import { google } from 'googleapis';

// Use the same Google auth from the main googleSheets file
const getGoogleSheetsClient = () => {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        return google.sheets({ version: 'v4', auth });
    } catch (error) {
        console.error('Error initializing Google Sheets client:', error);
        throw error;
    }
};

export interface PartnerData {
    applicationId: string;
    dateTime: string;
    fullName: string;
    gender: string;
    whatsapp: string;
    email: string;
    portfolio: string;
    location: string;
    experience: string;
    ownKit: string;
    hasLaptop: string;
    hasVehicle: string;
    reason: string;
    status: string;
}

// Save partner application to Google Sheets
export const savePartnerToGoogleSheets = async (partnerData: PartnerData) => {
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_PARTNER_SPREADSHEET_ID;

        if (!spreadsheetId) {
            throw new Error('Partner Google Sheets Spreadsheet ID not configured');
        }

        // Prepare the row data in the same order as headers
        const row = [
            partnerData.applicationId,
            partnerData.dateTime,
            partnerData.fullName,
            partnerData.gender,
            partnerData.whatsapp,
            partnerData.email,
            partnerData.portfolio,
            partnerData.location,
            partnerData.experience,
            partnerData.ownKit,
            partnerData.hasLaptop,
            partnerData.hasVehicle,
            partnerData.reason,
            partnerData.status,
        ];

        // Append the row to the sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:N', // Adjust if your sheet has a different name
            valueInputOption: 'RAW',
            requestBody: {
                values: [row],
            },
        });

        console.log('Partner application saved to Google Sheets:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error saving partner to Google Sheets:', error);
        throw error;
    }
};

// Initialize partner sheet with headers if empty
export const initializePartnerSheet = async () => {
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_PARTNER_SPREADSHEET_ID;

        if (!spreadsheetId) {
            throw new Error('Partner Google Sheets Spreadsheet ID not configured');
        }

        // Check if headers exist
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:N1',
        });

        if (!response.data.values || response.data.values.length === 0) {
            // Add headers
            const headers = [
                'Application ID',
                'Date & Time',
                'Full Name',
                'Gender',
                'WhatsApp',
                'Email',
                'Portfolio Link',
                'Location',
                'Experience',
                'Own Kit',
                'Has Laptop',
                'Has Vehicle',
                'Reason',
                'Status',
            ];

            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: 'Sheet1!A1:N1',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [headers],
                },
            });

            console.log('Partner Google Sheet initialized with headers');
        }
    } catch (error) {
        console.error('Error initializing partner Google Sheet:', error);
        throw error;
    }
};

// Generate unique application ID
export const generateApplicationId = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `APP-${timestamp}${random}`;
};
