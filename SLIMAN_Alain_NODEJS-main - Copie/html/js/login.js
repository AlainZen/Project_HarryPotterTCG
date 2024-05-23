document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Recup la valeur stockée et la définir dans l'input
    const storedEmail = localStorage.getItem('loginEmail');
    if (storedEmail) {
        emailInput.value = storedEmail;
    }

    // event pour stocker la valeur de l'email dans le localStorage
    emailInput.addEventListener('input', function() {
        localStorage.setItem('loginEmail', emailInput.value);
    });

    const logIn = async () => {
        let email = emailInput.value;
        let password = passwordInput.value;

        try {
            let response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            let data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log('Token stored in localStorage:', data.token); // Debug: Log token storage
                window.location.href = 'homepage.html'; // Redirection après connexion réussie
            } else {
                console.error('Token not received'); // Debug: Log missing token
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Afficher un message d'erreur à l'utilisateur
            alert('Login failed. Please try again.');
        }
    }

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        logIn();
    });
});
