import { getPrices } from "../modules/prices.js";
import { formatPrice, formatDate } from "../utils/formatters.js";
import { showLoading, showError, showSuccess } from "./states.js";

const refreshButton = document.querySelector("#actualiser button");
const pricesStatus = document.querySelector("#prices-status");
const cardsContainer = document.querySelector("#cards");
const date = document.querySelector("#date");

export async function renderCards(currency, disableRefresh = false) {

    if (disableRefresh) {
        refreshButton.disabled = true;
    }

    showLoading(pricesStatus, "Chargement des prix...");

    try {
        const currencyPrices = await getPrices(currency);

        cardsContainer.replaceChildren();

        currencyPrices.forEach((metal) => {
            const card = document.createElement("article");
            card.classList.add("metal-card", `metal-card--${metal.direction}`);

            const name = document.createElement("h3");
            name.textContent = metal.name;

            const price = document.createElement("p");
            price.classList.add("metal-price");
            price.textContent = formatPrice(metal.price, currency);

            const variation = document.createElement("p");
            variation.classList.add("metal-variation");

            let arrow = "→";
            let sign = "";

            if (metal.direction === "up") {
                arrow = "↑";
                sign = "+";
            } else if (metal.direction === "down") {
                arrow = "↓";
                // sign = "-";
            }

            const formattedVariation = formatPrice(
                Math.abs(metal.variation),
                currency
            );

            variation.textContent =
                `${arrow} ${sign}${formattedVariation} (${sign}${metal.percentage}%)`;

            card.append(name, price, variation);
            cardsContainer.appendChild(card);
        });

        date.textContent = formatDate(currencyPrices[0].updatedAt);

        showSuccess(pricesStatus, "Prix actualisés avec succès.");
    } catch (error) {
        showError(pricesStatus, error, () => {
            renderCards(currency);
        });
    } finally {
        if (disableRefresh) {
            refreshButton.disabled = false;
        }
    }
}