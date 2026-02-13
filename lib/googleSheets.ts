import { google } from 'googleapis';

// Initialize Google Sheets API
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

export interface OrderData {
    orderId: string;
    dateTime: string;
    customerName: string;
    email: string;
    phone: string;
    packageName: string;
    addons: string;
    totalAmount: number;
    advancePaid: number;
    paymentId: string;
    paymentStatus: string;
    eventDate: string;
    eventLocation: string;
    specialRequests: string;
}

// Save order to Google Sheets
export const saveOrderToGoogleSheets = async (orderData: OrderData) => {
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

        if (!spreadsheetId) {
            throw new Error('Google Sheets Spreadsheet ID not configured');
        }

        // Prepare the row data in the same order as headers
        const row = [
            orderData.orderId,
            orderData.dateTime,
            orderData.customerName,
            orderData.email,
            orderData.phone,
            orderData.packageName,
            orderData.addons,
            orderData.totalAmount,
            orderData.advancePaid,
            orderData.paymentId,
            orderData.paymentStatus,
            orderData.eventDate,
            orderData.eventLocation,
            orderData.specialRequests,
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

        console.log('Order saved to Google Sheets:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        throw error;
    }
};

// Get order by ID from Google Sheets
export const getOrderFromGoogleSheets = async (orderId: string) => {
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

        if (!spreadsheetId) {
            throw new Error('Google Sheets Spreadsheet ID not configured');
        }

        // Get all rows
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A:N',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return null;
        }

        // Find the row with matching order ID (column A)
        const orderRow = rows.find((row) => row[0] === orderId);

        if (!orderRow) {
            return null;
        }

        // Convert row to OrderData object
        const orderData: OrderData = {
            orderId: orderRow[0],
            dateTime: orderRow[1],
            customerName: orderRow[2],
            email: orderRow[3],
            phone: orderRow[4],
            packageName: orderRow[5],
            addons: orderRow[6],
            totalAmount: parseFloat(orderRow[7]),
            advancePaid: parseFloat(orderRow[8]),
            paymentId: orderRow[9],
            paymentStatus: orderRow[10],
            eventDate: orderRow[11],
            eventLocation: orderRow[12],
            specialRequests: orderRow[13],
        };

        return orderData;
    } catch (error) {
        console.error('Error fetching from Google Sheets:', error);
        throw error;
    }
};

// Initialize sheet with headers if empty
export const initializeGoogleSheet = async () => {
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

        if (!spreadsheetId) {
            throw new Error('Google Sheets Spreadsheet ID not configured');
        }

        // Check if headers exist
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:N1',
        });

        if (!response.data.values || response.data.values.length === 0) {
            // Add headers
            const headers = [
                'Order ID',
                'Date & Time',
                'Customer Name',
                'Email',
                'Phone',
                'Package',
                'Addons',
                'Total Amount',
                'Advance Paid',
                'Payment ID',
                'Payment Status',
                'Event Date',
                'Event Location',
                'Special Requests',
            ];

            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: 'Sheet1!A1:N1',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [headers],
                },
            });

            console.log('Google Sheet initialized with headers');
        }
    } catch (error) {
        console.error('Error initializing Google Sheet:', error);
        throw error;
    }
};
