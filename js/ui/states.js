const errorMessages = {
    
}

function showSuccess(container, message) {
    container.replaceChildren();

    const text = document.querySelector("p");
    text.textContent = message;

    container.appendChild(text);
}
