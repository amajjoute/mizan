import { renderCards } from "./ui/cards.js";

const currency = document.querySelector("#currency");
const refreshButton = document.querySelector("#actualiser")

const savedCurrency = localStorage.getItem("currency");

if (savedCurrency) {
    currency.value = savedCurrency;
}

renderCards(currency.value);

currency.addEventListener("change", () => {
    renderCards(currency.value);
});

refreshButton.addEventListener("click", () => {
    console.log("Refresh clicked");
    localStorage.setItem("currency", currency.value);
    renderCards(currency.value);
});