import { getData } from "../services/api";

const TROY_OUNCE_IN_GRAM = 31.1035;

export async function getPrices(currency) {
    const data = await getData(currency);

    const gold = {
        name: "Or",
        price: data.xau.price,
        currency: data.xau.currency,
        unit: "gram",
        updateAt: data.updated_at
    }
}