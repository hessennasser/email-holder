const form = document.querySelector('.login-form');
const apiUrl = 'https://ahmedapi.onrender.com/api/v1/auth/login';
const redirectUrl = 'home.html';

function checkLogin() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // Check if auth key is saved in sessionStorage
    const authKey = sessionStorage.getItem('authKey');

    // If both conditions are true, redirect to home page
    if (isLoggedIn && authKey) {
        window.location.href = 'home.html';
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = form.querySelector('input[name="Email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const btn = form.querySelector("button");


    if (!email || !password) {
        alert('Please enter a valid email and password.');
        return;
    }
    btn.disabled = true;
    console.log(email);
    console.log(password);

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }
            return response.json();
        })
        .then(data => {
            const authKey = data.AccessToken;
            sessionStorage.setItem('authKey', authKey);
            sessionStorage.setItem('isLoggedIn', true);
            window.location.href = redirectUrl;
            btn.disabled = false;
        })
        .catch(error => {
            console.error(error);
            alert('Failed to authenticate. Please try again later.');
            btn.disabled = false;
        });
});
