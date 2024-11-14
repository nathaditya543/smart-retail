// src/Bill.js
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // Importing from react-qr-code

const Bill = () => {
    const [items, setItems] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false); // State to control QR code visibility
    const [upiLink, setUpiLink] = useState(''); // State for UPI link

    // Fetch data from local JSON file when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json'); // Path to the JSON file
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setItems(jsonData); // Set items state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.cost), 0);

    // Function to generate UPI link
    const generateUpiLink = () => {
        const upiId = "9998249805@axisb"; // Replace with actual UPI ID
        const transactionNote = "Payment for items";
        const amount = totalAmount.toFixed(2); // Format amount to 2 decimal places
        const upiLink = `upi://pay?pa=${upiId}&am=${amount}&tn=${transactionNote}&cu=INR`;
        
        setUpiLink(upiLink); // Set UPI link state
        setShowQRCode(true);  // Show QR code after generating link
    };

    return (
        <div>
            <h1>Billing System</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.cost}</td>
                            <td>{(item.quantity * item.cost).toFixed(2)}</td> {/* Calculate total cost for display */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-amount">
                <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            </div>

            {/* Button to generate and display QR code */}
            <button onClick={generateUpiLink}>Generate UPI QR Code</button>

            {/* Display QR Code if showQRCode is true */}
            {showQRCode && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Scan to Pay:</h3>
                    <QRCode value={upiLink} size={256} /> {/* Generate and display QR code */}
                </div>
            )}
        </div>
    );
};

export default Bill;