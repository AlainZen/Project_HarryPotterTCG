document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://hp-api.lainocs.fr/characters";
  const openBoosterButton = document.getElementById("open-booster");
  const cardDisplay = document.getElementById("card-display");

  openBoosterButton.addEventListener("click", function () {
      fetch(apiUrl)
      .then((response) => response.json())
      .then((cards) => {
          displayRandomCards(cards);
          sendBoosterOpenedData(generatedCards);
      })
      .catch((error) => {
          console.error("Erreur lors de la récupération des cartes:", error);
      });
  });

  let generatedCards = [];

  function displayRandomCards(cards) {
      cardDisplay.innerHTML = "";
      generatedCards = [];
      
      for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * cards.length);
          const card = cards[randomIndex];
          const cardElement = createCardElement(card);
          cardDisplay.appendChild(cardElement);
          generatedCards.push(card);
      }

      console.log('Generated cards:', generatedCards); // Debug: Log the generated cards
  }

  function createCardElement(card) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.name;

      const name = document.createElement("h3");
      name.textContent = card.name;

      cardDiv.appendChild(img);
      cardDiv.appendChild(name);

      return cardDiv;
  }

  function sendBoosterOpenedData(cards) {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
      console.log('Token retrieved from localStorage:', token); // Debug: Log the token retrieved
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (token) {
          headers.append('Authorization', `Bearer ${token}`);
      }

      console.log('Sending cards to backend:', JSON.stringify({ cards })); // Debug: Log the cards being sent

      fetch('http://localhost:3000/api/open-booster', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ cards })
      })
      .then(response => {
          console.log('Response status:', response.status); // Debug: Log the response status
          if (!response.ok) {
              throw new Error('Request failed');
          }
          return response.json();
      })
      .then(data => {
          console.log('Response from backend:', data); // Debug: Log the response
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
});
