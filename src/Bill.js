// src/Bill.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // No need to import Link anymore

const Bill = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setItems(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.cost), 0);

    const handleGenerateUpiLink = () => {
        const upiId = "9998249805@axisb";
        navigate('/qrcode', { state: { upiId, totalAmount } });
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
                            <td>{(item.quantity * item.cost).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-amount">
                <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            </div>

            {/* Button container with aligned buttons */}
            <div className="button-container">
                <button className="button" onClick={handleGenerateUpiLink}>Generate UPI QR Code</button>
                <a href="/ai-summary" target="_blank" rel="noopener noreferrer">
                    <button className="button">Go to AI Summary</button>
                </a>
            </div>
        </div>
    );
};

export default Bill;
