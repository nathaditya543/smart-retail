// src/ModifyData.js
import React from 'react';

const ModifyData = () => {
    const updateData = async (newData) => {
        try {
            const response = await fetch('http://localhost:5000/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData), // Send new data as JSON
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            console.log(result); // Log success message

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const setAmulButter = () => {
        const newItem = [
            { name: "Amul Butter", quantity: 1, cost: 30 }
        ];
        updateData(newItem); // Update JSON with Amul Butter only
    };

    const setPaneer = () => {
        const newItem = [
            { name: "Paneer", quantity: 1, cost: 50 }
        ];
        updateData(newItem); // Update JSON with Paneer only
    };

    const addBothItems = () => {
        const newItems = [
            { name: "Amul Butter", quantity: 1, cost: 30 },
            { name: "Paneer", quantity: 1, cost: 50 }
        ];
        updateData(newItems); // Update JSON with both items
    };

    const clearItems = () => {
        updateData([]); // Clear items in JSON
    };

    return (
        <div>
            <h1>Modify JSON Data</h1>
            <button onClick={setAmulButter}>Set Amul Butter</button>
            <button onClick={setPaneer}>Set Paneer</button>
            <button onClick={addBothItems}>Add Both Items</button>
            <button onClick={clearItems}>Clear Items</button>

            {/* Display current items for debugging */}
            <h2>Current Items:</h2>
        </div>
    );
};

export default ModifyData;