import Chart from 'chart.js/auto';
import { getHistory } from "../services/api.js";

const chartCanvas = document.querySelector("#history-canvas");

const historyChart = new Chart(chartCanvas, {
    type: "line",

    data: {
        labels: [],
        datasets: [{
            label: "Prix",
            data: [],
            borderColor: "#16a34a",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
                title: {
                    display: true,
                    text: "Prix"
                }
            }
        }
    }
});

export function updateHistoryChart(points) {
    historyChart.data.labels = points.map(point =>
        new Date(point.t * 1000).toLocaleDateString("fr-FR")
    );

    historyChart.data.datasets[0].data = points.map(point => point.c);

    historyChart.update();
}

export async function loadHistoryChart(symbol, period) {
    try {
        const history = await getHistory(symbol, period);

        updateHistoryChart(history.points);

    } catch (error) {
        console.error("Error loading history chart:", error);
    }
}

