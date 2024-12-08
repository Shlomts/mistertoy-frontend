import React from "react"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export function CharPrice({ labels, toysByLabel }) {
    function avrgPriceByLabel() {
        return Object.values(toysByLabel).map((toysAtLabel) => {
            const totalPrice = toysAtLabel.reduce(
                (sum, toy) => sum + toy.price,
                0
            )
            return toysAtLabel.length > 0
                ? Math.round(totalPrice / toysAtLabel.length)
                : 0
        })
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: `Average price`,
                data: avrgPriceByLabel() || [0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }
    return (
        <section className="char price">
            <h3>Average price per label</h3>
            <Doughnut data={data} />
        </section>
    )
}
