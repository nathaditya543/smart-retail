// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Bill from './Bill';
import ModifyData from './ModifyData';
import QRCodePage from './QRCodePage'; // Import the QRCodePage component
import AISummary from './AISummary'; // Import the new AISummary component

function App() {
    const [items, setItems] = useState([]); // State for items

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Bill items={items} />} />
                    <Route path="/modify" element={<ModifyData setItems={setItems} />} />
                    <Route path="/qrcode" element={<QRCodePage />} /> {/* New route for QR code page */}
                    <Route path="/ai-summary" element={<AISummary />} /> {/* New route for AI summary */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
