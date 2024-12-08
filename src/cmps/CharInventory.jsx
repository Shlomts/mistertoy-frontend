import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register( RadialLinearScale, Tooltip, Legend);

export function CharInventory({ labels, toysByLabel ={} }) {

    function percentageInStockByLabel() {
        return Object.values(toysByLabel).map((toysAtLabel) => {
            const totalToys = toysAtLabel.length;
            const inStockToys = toysAtLabel.filter(toy => toy.inStock).length
            return totalToys > 0
                ? Math.round((inStockToys / totalToys) * 100)
                : 0
        })
    }
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Percentage In Stock',
                data: percentageInStockByLabel() || [0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <section className="char inventory">
            <h3>Percentage of toys in Stock per label</h3>
            <PolarArea data={data} />
        </section>
    )


}