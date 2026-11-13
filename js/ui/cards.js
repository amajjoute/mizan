import { getPrices } from "../modules/prices.js";
import { formatPrice, formatDate } from "../utils/formatters.js";

const cardsContainer = document.querySelector("#cards");
const date = document.querySelector("#date");

export async function renderCards(currency) {
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
}