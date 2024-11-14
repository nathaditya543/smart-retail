// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Bill from './Bill';
import ModifyData from './ModifyData';

function App() {
    const [items, setItems] = useState([]); // State for items

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Bill items={items} />} />
                    <Route path="/modify" element={<ModifyData setItems={setItems} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;