document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (slug) {
      fetchCardDetails(slug);
  }

  function fetchCardDetails(slug) {
      fetch(`https://hp-api.lainocs.fr/characters/${slug}`)
          .then((response) => response.json())
          .then((data) => displayCardDetails(data))
          .catch((error) =>
              console.error(
                  "Erreur lors de la récupération des détails de la carte:",
                  error
              )
          );
  }

  function displayCardDetails(cardData) {
      document.querySelector(".card-title").textContent = cardData.name;
      document.querySelector(".card-image").src = cardData.image;

      document.getElementById("eyes").textContent = `Couleur des yeux: ${cardData.eyes}`;
      document.getElementById("hairs").textContent = `Couleur des cheveux: ${cardData.hairs}`;
      document.getElementById("birthday").textContent = `Date de naissance: ${cardData.birthday}`;
      document.getElementById("blood").textContent = `Sang: ${cardData.blood}`;
      document.getElementById("wand").textContent = `Baguette: ${cardData.wand}`;
      document.getElementById("patronus").textContent = `Patronus: ${cardData.patronus}`;
      document.getElementById("role").textContent = `Rôle: ${cardData.role}`;
      document.getElementById("house").textContent = `Maison: ${cardData.house}`;
      document.getElementById("actor").textContent = `Acteur: ${cardData.actor}`;
  }
});

function toggleFavorite() {
    const favoriteButton = document.getElementById("favorite-button");
    favoriteButton.classList.toggle("active"); // Basculer la classe active
  }
