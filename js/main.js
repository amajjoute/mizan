import { renderCards } from "./ui/cards.js";

const currency = document.querySelector("#currency");
const refreshButton = document.querySelector("#actualiser")

renderCards(currency.value);

currency.addEventListener("change", () => {
    renderCards(currency.value);
});

refreshButton.addEventListener("click", () => {
    console.log("Refresh clicked");
    renderCards(currency.value);
});