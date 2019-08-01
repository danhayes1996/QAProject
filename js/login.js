function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        "email" :  email,
        "password" : password
    };
    makeRequest('POST', BASE_URL + USERS + VERIFY, JSON.stringify(data))
        .then(value => {
            if(!isNaN(value)) {
                sessionStorage.setItem('userId', value);
                window.location = "home.html";
            } else {
                const errorDiv = document.getElementById('loginError');
                errorDiv.style.display = "block";
            }
        });
    return false;
}