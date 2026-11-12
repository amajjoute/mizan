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
