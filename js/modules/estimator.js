import { getPrices } from "./prices.js";
import { calculateEstimatedValue } from "../utils/calculations.js";
import { formatPrice } from "../utils/formatters.js";

const form = document.querySelector("#form");
const weightInput = document.querySelector("#poids");
const metalSelect = document.querySelector("#metal");
const result = document.querySelector("#result");

export function initEstimator() {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const weight = Number(weightInput.value);

        if (!weightInput.value || !Number.isFinite(weight) || weight <= 0) {
            result.textContent = "Veuillez saisir un poids valide.";
            return;
        }

        result.textContent = "";

        const currency = document.querySelector("#currency").value;
        const selectedMetal = metalSelect.value;

        const prices = await getPrices(currency);

        const metalIndex = selectedMetal === "xau" ? 0 : 1;
        const metal = prices[metalIndex];

        const estimatedValue = calculateEstimatedValue(
            weight,
            metal.price
        );

        result.textContent = formatPrice(estimatedValue, currency);
    });
}