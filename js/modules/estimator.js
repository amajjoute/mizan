import { getPrices } from "./prices.js";
import { calculateEstimatedValue } from "../utils/calculations.js";
import { formatPrice } from "../utils/formatters.js";

const form = document.querySelector("#form");
const weightInput = document.querySelector("#poids");
const metalSelect = document.querySelector("#metal");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const weight = Number(weightInput.value);

    if (!weightInput.value || !Number.isFinite(weight) || weight <= 0) {
        result.textContent = "Veuillez saisir un poids valide.";
        return;
    }

    result.textContent = "";
});