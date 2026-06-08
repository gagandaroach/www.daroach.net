import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const chartLabels: string[] = ["daroach.net", "/about", "/blog"]
const chartRoutes: string[] = ["/", "/about", "/blog"]

const chartOptions: Object = { scales: {} }
const chartBgColor: string[] = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
]
const chartBorderColor: string[] = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
]
const chartBorderWidth: number = 1

type PageCountDict = Record<string, number>

function chartData() {
    const [pageCounts, setPageCounts] = useState<PageCountDict>({})

    chartRoutes.map((path: string) => {
        fetch(`/api/hits/count?path=${path}`)
            .then((res) =>
                res.json()).then((res) => {
                const newCounts: PageCountDict = { ...pageCounts };
                newCounts[path] = res.data;
                setPageCounts(newCounts);
            }
            );
    });

    return {
        labels: chartLabels,
        datasets: [
            {
                label: "Page Hits",
                data: chartRoutes.map((path) => pageCounts[path]),
                backgroundColor: chartBgColor,
                borderColor: chartBorderColor,
                borderWidth: chartBorderWidth,
            },
        ],
    };
}

const PageHits = () => (
    <div>
        <h2>Total Page Hits</h2>
        {/* Disabled due to spam load glitch */}
        {/* <Pie
            data={chartData()}
            width={400}
            height={400}
        /> */}
    </div>
)

export default PageHits;
