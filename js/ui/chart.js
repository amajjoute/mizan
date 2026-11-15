import Chart from 'chart.js/auto';

const chartContainer = document.querySelector("#history-canvas");

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
        maintainAspectRatio: false
    }
});