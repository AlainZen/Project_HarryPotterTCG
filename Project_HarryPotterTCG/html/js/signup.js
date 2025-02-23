const signUp = async () => {
    let email = document.getElementById('signup-email').value;
    let pseudo = document.getElementById('signup-pseudo').value;
    let password = document.getElementById('signup-password').value;

    // Valider le formulaire côté client
    if (!email || !pseudo || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Envoi de la requête d'inscription
    try {
        let response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pseudo, password }),
        });


        if (response.ok) {
            window.location.href = 'homepage.html';
        } else {
            let data = await response.json();
            alert(data.message || 'Une erreur s\'est produite lors de l\'inscription.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête :', error);
        alert('Une erreur s\'est produite lors de l\'inscription.');
    }
};
