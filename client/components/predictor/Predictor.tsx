// components/Predictor.tsx
import React, { useState } from 'react';

const Predictor: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [prediction, setPrediction] = useState<string | null>(null);

    const handlePredict = async () => {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symptoms }),
        });
        const data = await response.json();
        setPrediction(data.disease);
    };

    return (
        <div>
            <h1>Disease Predictor</h1>
            <input
                type="text"
                placeholder="Enter symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            />
            <button onClick={handlePredict}>Predict</button>
            {prediction && <p>Predicted Disease: {prediction}</p>}
        </div>
    );
};

export default Predictor;
