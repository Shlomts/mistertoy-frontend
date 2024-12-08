import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function CharDates({labels}) {
    
    const data = {
        labels: labels || [],
        datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
    }

    return (
        <section className="char dates">
            <h3>Percentage of toys in Stock per label</h3>
            <Line data={data} />
        </section>
    )


}