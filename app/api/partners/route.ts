import { NextRequest, NextResponse } from 'next/server';
import { savePartnerToGoogleSheets, generateApplicationId, PartnerData } from '@/lib/partnerSheets';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log('📥 Received partner application:', JSON.stringify(body, null, 2));

        // Validate required fields
        const requiredFields = ['fullName', 'gender', 'whatsapp', 'email', 'portfolio', 'location', 'experience', 'ownKit', 'hasLaptop', 'hasVehicle', 'reason'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            console.error('❌ Missing required fields:', missingFields);
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Generate unique application ID
        const applicationId = generateApplicationId();

        // Prepare partner data for Google Sheets
        const partnerData: PartnerData = {
            applicationId,
            dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            fullName: body.fullName,
            gender: body.gender,
            whatsapp: body.whatsapp,
            email: body.email,
            portfolio: body.portfolio,
            location: body.location,
            experience: body.experience,
            ownKit: body.ownKit,
            hasLaptop: body.hasLaptop,
            hasVehicle: body.hasVehicle,
            reason: body.reason,
            status: 'Pending Review',
        };

        console.log('📊 Prepared partner data for Google Sheets:', partnerData);

        // Save to Google Sheets
        console.log('💾 Saving partner application to Google Sheets...');
        await savePartnerToGoogleSheets(partnerData);
        console.log('✅ Successfully saved partner application to Google Sheets!');

        return NextResponse.json({
            success: true,
            message: 'Partner application submitted successfully',
            applicationId: applicationId,
        });
    } catch (error) {
        console.error('❌ Error saving partner application:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');

        return NextResponse.json(
            {
                error: 'Failed to submit partner application',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
