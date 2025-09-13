import React from 'react';
import { MeterGroup } from 'primereact/metergroup';

export default function ChronicDiseaseDistributionByYear() {
    // Data for each year (example data - replace as needed)
    const yearlyData = {
        2020: [
            { label: 'Malaria', color: '#1F8297', value: 10},
            { label: 'J.E.', color: '#69ABB9', value: 3},
            { label: 'A.E.S', color: '#60a5fa', value: 6},
            { label: 'Dengue', color: '#c084fc', value: 1},
            { label: 'Chikungunya', color: '#ef4444', value: 0}
        ],
        2021: [
            { label: 'Malaria', color: '#1F8297', value: 28},
            { label: 'J.E.', color: '#69ABB9', value: 1},
            { label: 'A.E.S', color: '#60a5fa', value: 2},
            { label: 'Dengue', color: '#c084fc', value: 39},
            { label: 'Chikungunya', color: '#ef4444', value: 0}
        ],
        2022: [
            { label: 'Malaria', color: '#1F8297', value: 7},
            { label: 'J.E.', color: '#69ABB9', value: 5},
            { label: 'A.E.S', color: '#60a5fa', value: 23},
            { label: 'Dengue', color: '#c084fc', value: 14},
            { label: 'Chikungunya', color: '#ef4444', value: 0}
        ],
        2023: [
            { label: 'Malaria', color: '#1F8297', value: 22},
            { label: 'J.E.', color: '#69ABB9', value: 2},
            { label: 'A.E.S', color: '#60a5fa', value: 29},
            { label: 'Dengue', color: '#c084fc', value: 25},
            { label: 'Chikungunya', color: '#ef4444', value: 0}
        ],
        2024: [
            { label: 'Malaria', color: '#1F8297', value: 26},
            { label: 'J.E.', color: '#69ABB9', value: 3},
            { label: 'A.E.S', color: '#60a5fa', value: 19},
            { label: 'Dengue', color: '#c084fc', value: 226},
            { label: 'Chikungunya', color: '#ef4444', value: 0}
        ]
    };

    return (
        <div className="card">
            {Object.keys(yearlyData).map((year) => (
                <div key={year} className="flex flex-column mb-2">
                    <h3 className="font-medium mb-2 text-left">{year}</h3>
                    <MeterGroup values={yearlyData[year]} />
                </div>
            ))}
        </div>
    );
}
