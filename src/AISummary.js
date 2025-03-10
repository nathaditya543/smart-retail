// src/AISummary.js
import React from 'react';
import ContentGenerator from './ContentGenerator.js'; // Import the ContentGenerator component

const AISummary = () => {
    return (
        <div className="ai-summary-container">
            <h1>AI Summary</h1>
            <ContentGenerator /> {/* Use ContentGenerator to generate the summary */}
        </div>
    );
};

export default AISummary;
