// src/Bill.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Bill = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

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

    // Function to navigate to QR code page with UPI ID and total amount
    const handleGenerateUpiLink = () => {
        const upiId = "9998249805@axisb"; // Replace with actual UPI ID
        navigate('/qrcode', { state: { upiId, totalAmount } }); // Navigate to QR code page with state
    };

    return (
        <div className="bill-container">
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
            <div className="button-container">
                <button onClick={handleGenerateUpiLink}>Generate UPI QR Code</button>
            </div>
        </div>
    );
};

export default Bill;