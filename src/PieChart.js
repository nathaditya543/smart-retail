// src/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ proteins, carbs, fats }) => {
    const data = {
        labels: ['Proteins', 'Carbs', 'Fats'],
        datasets: [
            {
                label: 'Macronutrient Distribution',
                data: [proteins, carbs, fats],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Add this line
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Macronutrient Distribution',
            },
        },
    };

    return <div style={{ width: '300px', height: '300px' }}><Pie data={data} options={options} /></div>;
};

export default PieChart;
