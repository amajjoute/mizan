import { renderCards } from "./ui/cards.js";
import { loadHistoryChart } from "./ui/chart.js";

const currency = document.querySelector("#currency");
const refreshButton = document.querySelector("#actualiser");

const historyMetal = document.querySelector("#history-metal");
const historyPeriod = document.querySelector("#history-period");

const savedCurrency = localStorage.getItem("currency");

if (savedCurrency) {
    currency.value = savedCurrency;
}

renderCards(currency.value);
loadHistoryChart(historyMetal.value, historyPeriod.value);

currency.addEventListener("change", () => {
    renderCards(currency.value);
});

refreshButton.addEventListener("click", () => {
    console.log("Refresh clicked");
    localStorage.setItem("currency", currency.value);
    renderCards(currency.value);
});

historyMetal.addEventListener("change", () => {
    loadHistoryChart(historyMetal.value, historyPeriod.value);
});

historyPeriod.addEventListener("change", () => {
    loadHistoryChart(historyMetal.value, historyPeriod.value);
});