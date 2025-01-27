// src/QRCodePage.js
import React from 'react';
import QRCode from 'react-qr-code'; // Importing from react-qr-code
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing location state

const QRCodePage = () => {
    const location = useLocation(); // Get location object
    const { upiId, totalAmount } = location.state || {}; // Destructure UPI ID and total amount

    if (!upiId || !totalAmount) {
        return <div>Error: No UPI link or amount provided.</div>; // Handle case where no UPI link is available
    }

    const transactionNote = "Payment for items";
    const upiLink = `upi://pay?pa=${upiId}&am=${totalAmount.toFixed(2)}&tn=${transactionNote}&cu=INR`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Scan to Pay</h1>
            <QRCode value={upiLink} size={256} />
            <p>Use your UPI app to scan the QR code and make the payment.</p>
        </div>
    );
};

export default QRCodePage;