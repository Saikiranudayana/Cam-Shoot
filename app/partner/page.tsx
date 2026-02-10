import PartnerForm from '@/components/PartnerForm';

export default function PartnerPage() {
    return (
        <div style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <PartnerForm />
                </div>
            </div>
        </div>
    );
}
