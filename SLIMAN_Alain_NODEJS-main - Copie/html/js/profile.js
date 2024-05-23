window.onload = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            // extract pseudo & email from data
            const pseudo = data.pseudo;
            const email = data.email;
            const cards = data.cards.map(userCard => userCard.card);

            // Display pseudo & email dans le header
            document.getElementById('pseudo').innerText = pseudo;
            document.getElementById('email').innerText = email;

            // Display usercards
            const cardDisplay = document.getElementById('card-display');
            cardDisplay.innerHTML = ""; // Clear toute les cartes
            cards.forEach(card => {
                const cardElement = createCardElement(card);
                cardDisplay.appendChild(cardElement);
            });
        } else {
            console.error('Failed to fetch user data');
        }
    }
};

function createCardElement(card) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const img = document.createElement("img");
    img.src = card.imageUrl;
    img.alt = card.name;

    const name = document.createElement("h3");
    name.textContent = card.name;

    cardDiv.appendChild(img);
    cardDiv.appendChild(name);

    return cardDiv;
}
