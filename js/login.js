function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        "email" :  email,
        "password" : password
    };
    //const data = '{"email":"' + email + '","password":"' + password + '"}';
    //console.log(data);
    makeRequest('POST', 'http://localhost:8080/GamesApp/api/user/verify', JSON.stringify(data))
        .then(value => {
            console.log("value: ", value);
            if(!isNaN(value)) {
                sessionStorage.setItem('userId', value);
                window.location = "home.html";
            } else {
                //not correct login info
                //put message on screen saying incorrect info (DONT redirect back to login2.html)
                const errorDiv = document.getElementById('loginError');
                errorDiv.style.display = "block";
            }
        }).catch(reason => {
            console.log(reason);
        });
    return false;
}