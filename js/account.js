function populate (){
    const userId = sessionStorage.getItem('userId');
    if(userId) {
        makeRequest('GET', 'http://localhost:8080/GamesApp/api/user/get/' + userId)
            .then (value => {
                console.log(value);
                if(value.error) {

                } else {

                }
            });
    } else {
        window.location = "login.html";
    }
}

