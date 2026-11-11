export async function getData(currency) {
    const allowedCurrency = ["MAD", "USD", "EUR"];

    if (!allowedCurrency.includes(currency)) {
        throw new Error("Unsupported currency");
    }

    const url = `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
        
    const data = await response.json();

    return data;
}

const data = await getData("USD");

console.log("Gold:", data.xau.price);
console.log("Currency:", data.xau.currency);
console.log("Updated:", data.updated_at);
console.log("Silver:", data.silver_usd_oz);