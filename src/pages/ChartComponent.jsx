import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartComponent({ chartData, currency }) {
    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const formatTime = (time) => {
        const date = new Date(time);
        if (isToday(date)) {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const dataset = chartData.map((d) => d.price);
    const labels = chartData.map((d) => formatTime(d.time));

    const getSegmentColors = () => {
        const colors = [];
        for (let i = 1; i < dataset.length; i++) {
            const prevPrice = dataset[i - 1];
            const currentPrice = dataset[i];
            colors.push(currentPrice > prevPrice ? 'blue' : currentPrice < prevPrice ? 'red' : 'yellow');
        }
        return colors;
    };

    const segmentColors = getSegmentColors();

    const datasets = [{
        label: 'Price',
        data: dataset,
        fill: false,
        borderColor: (context) => {
            const { dataIndex } = context;
            if (dataIndex > 0) {
                return segmentColors[dataIndex - 1];
            }
            return 'blue';
        },
        tension: 0.3,
        borderWidth: 1,
        pointRadius: (context) => context.dataIndex === dataset.length - 1 ? 8 : 4, // Last point larger
        pointBackgroundColor: (context) => {
            const { dataIndex } = context;
            if (dataIndex > 0) {
                return segmentColors[dataIndex - 1];
            }
            return 'blue';
        },
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'blue',
        pointHoverBorderWidth: 4,
    }];

    return (
        <div className="chart-container">
            <Line
                data={{
                    labels,
                    datasets,
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                maxTicksLimit: 10,
                                callback: function (value, index, values) {
                                    const label = labels[index];
                                    return window.innerWidth <= 576 ? label.split(' ').join('\n') : label;
                                },
                            },
                        },
                        y: {
                            position: 'right',
                            ticks: {
                                callback: (value) => `${value} ${currency}`,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false, 
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false, 
                        },
                    },
                    elements: {
                        line: {
                            borderJoinStyle: 'miter',
                        },
                    },
                }}
            />
        </div>
    );
}
