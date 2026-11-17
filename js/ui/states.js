const errorMessages = {
    OFFLINE: "Vous êtes hors ligne. Vérifiez votre connexion.",
    NETWORK_ERROR: "Erreur réseau. Impossible de contacter le serveur.",
    HTTP_Client_ERROR: "Erreur HTTP : requête incorrecte (4xx).",
    HTTP_Server_ERROR: "Erreur serveur (5xx). Réessayez plus tard.",
    Too_Many_Requests: "Quota API dépassé. Réessayez plus tard.",
    Parsing_Fails_Invalid_JSON: "La réponse du serveur est illisible."
}

function showLoading(container, message) {
    container.replaceChildren();

    const text = document.querySelector("p");
    text.textContent = message;

    container.appendChild(text);
}

function showSuccess(container, message) {
    container.replaceChildren();

    const text = document.querySelector("p");
    text.textContent = message;

    container.appendChild(text);
}

function showError(container, error, retryCallback) {
    container.replaceChildren();

    const text = document.createElement("p");
    text.textContent = errorMessages[error.message] || error.message;

    const retryButton = document.createElement("button");
    retryButton.textContent = "Réessayer";
    retryButton.type = "button";

    retryButton.addEventListener("click", retryCallback);

    container.append(text, retryButton);
}