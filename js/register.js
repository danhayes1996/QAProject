function signup(){
    const inputs = document.getElementsByClassName('registerInput');
    const data = {};
    for(input of inputs){
        data[input.id] = input.value;
    }
    console.log(data);

    makeRequest('POST', 'http://localhost:8080/GamesApp/api/user/create', JSON.stringify(data))
        .then(value => {
            if(value.error){
                console.log(value);
                const errDiv = document.getElementById('registerError');
                const p = document.createElement('p');
                p.innerText = value.message;
                errDiv.append(p);
                errDiv.style.display = "block";
            } else {
                window.location = "home.html";
            }
        });

    return false;
}