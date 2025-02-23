document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://hp-api.lainocs.fr/characters";

  const cardContainer = document.getElementById("card-container");
  const houseFilter = document.getElementById("house-filter");
  const filterButton = document.getElementById("filter-button");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((cardData) => {
        const card = createCard(cardData);
        cardContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erreur lors du fetch des données:", error);
    });

  function createCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-house", cardData.house);

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-image");
    cardImage.src = cardData.image;
    cardImage.alt = `Image de ${cardData.name}`;

    const cardDetails = document.createElement("div");
    cardDetails.classList.add("card-details");

    const cardName = document.createElement("h2");
    cardName.classList.add("card-name");
    cardName.textContent = cardData.name;

    const cardLink = document.createElement("a");
    cardLink.classList.add("card-link");
    cardLink.href = `details.html?slug=${cardData.slug}`;
    cardLink.textContent = "Voir les détails";

    cardDetails.appendChild(cardName);
    card.appendChild(cardImage);
    card.appendChild(cardDetails);
    card.appendChild(cardLink);

    return card;
  }

  filterButton.addEventListener("click", function () {
    filterCardsByHouse(houseFilter.value);
  });

  function filterCardsByHouse(house) {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const houseName = card.getAttribute("data-house");

      card.classList.remove("Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin");

      if (house === "" || house === houseName) {
        card.style.display = "block";
        if (house !== "") {
          card.classList.add(houseName);
        }
      } else {
        card.style.display = "none";
      }
    });
  }
});
