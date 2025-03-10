
// src/ContentGenerator.js
import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PieChart from './PieChart';
import './ContentGenerator.css';

const ContentGenerator = () => {
    const [lastItem, setLastItem] = useState(null);
    const [generatedContent, setGeneratedContent] = useState('');
    const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const formatNutritionalInfo = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
    };

    const fetchLastItem = async () => {
        try {
            const response = await fetch('/data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const items = await response.json();
            const lastItem = items[items.length - 1];

            if (lastItem) {
                // Process nutritional values
                const processValue = (value) => {
                    if (typeof value === 'string' && value.length > 0) {
                        const cleanedValue = value.slice(0, -1); // Remove the last character
                        const numberValue = Number(cleanedValue); // Convert to a number
                        return isNaN(numberValue) ? 0 : numberValue; // Return 0 if NaN
                    }
                    return 0; // Default to 0 if not a string or empty
                };

                // Update lastItem with processed values
                setLastItem({
                    ...lastItem,
                    proteins: processValue(lastItem.proteins),
                    carbs: processValue(lastItem.carbs),
                    fats: processValue(lastItem.fats),
                });
            } else {
                setLastItem(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLastItem(null);
        }
    };

    const generateContent = async (itemName) => {
        if (!itemName) return;

        const prompt = `Give me general information for ${itemName} in 60 words.`;
        try {
            const result = await model.generateContent(prompt);
            const formattedNutritionalInfo = formatNutritionalInfo(result.response.text());
            setGeneratedContent(formattedNutritionalInfo);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    useEffect(() => {
        fetchLastItem();
    }, []);

    useEffect(() => {
        if (lastItem) {
            generateContent(lastItem.name);
        }
    });

    return (
        <div className="content-generator">
            {lastItem && (
                <>
                    <div className="left-column">
                        {typeof lastItem.proteins === 'number' &&
                            typeof lastItem.carbs === 'number' &&
                            typeof lastItem.fats === 'number' && (
                                <PieChart
                                    proteins={lastItem.proteins}
                                    carbs={lastItem.carbs}
                                    fats={lastItem.fats}
                                />
                            )}
                    </div>
                    <div className="right-column">
                        <div>
                            <h3>Allergens:</h3>
                            <div className="allergens-badges">
                                {lastItem.allergens.map((allergen, index) => (
                                    <span key={index} className="allergen-badge">
                                        {allergen}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <h3>AI Summary:</h3>
                        {generatedContent && (
                            <div className="generated-content" dangerouslySetInnerHTML={{ __html: generatedContent }} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ContentGenerator;
