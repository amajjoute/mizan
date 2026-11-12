async function getData(currency) {
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

async function getHistoricalData(symbol) {
    const allowedSymbols = ["xau", "silver"];

    if (!allowedSymbols.includes(symbol)) {
        throw new Error("Unsupported symbol");
    }

    const response = await fetch(`https://xaus.com/api/v1/chart?symbol=${symbol}&range=5d&interval=1d`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    return result;
}

export { getData, getHistoricalData };