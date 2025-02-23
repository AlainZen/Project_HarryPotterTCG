document.addEventListener("DOMContentLoaded", () => {
  // Modal handling
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Navigation buttons
  const c1b1 = document.getElementById('c1b1');
  c1b1.addEventListener('click', () => {
      window.location.href = 'homepage.html';
  });

  const c2b2 = document.getElementById('c2b2');
  c2b2.addEventListener('click', () => {
      window.location.href = 'cartes.html';
  });

  const c3b3 = document.getElementById('c3b3');
  c3b3.addEventListener('click', () => {
      window.location.href = 'booster.html';
  });

  const c4b4 = document.getElementById('c4b4');
  c4b4.addEventListener('click', () => {
      window.location.href = 'login.html';
  });
});
