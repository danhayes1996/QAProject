function loadAccount (){
    const userId = sessionStorage.getItem('userId');
    if(userId) {
        makeRequest('GET', 'http://localhost:8080/GamesApp/api/user/get/' + userId)
            .then (value => {
                console.log(value);
                if(value.error) {
                    
                } else {
                    createPage(value);
                }
            });
    } else {
        window.location = "login.html";
    }
}

function createPage(userInfo) {
    const { id, password, ...other } = userInfo;
    const inputs = document.getElementsByClassName('input');
    let i = 0;
    for(e in other) {
        inputs[i++].value = other[e]; 
    }

}

function enableInputs() {
    const inputs = document.getElementsByClassName('input');
    for(i of inputs){
        i.disabled = false;
    }
    const updateBtn = document.getElementById('updateBtn');
    updateBtn.value = "Save";
    updateBtn.onclick = (event) => {
        event.stopPropagation(); //absorb click
        updateUserInfo();
    };
}

function updateUserInfo() {
    const inputs = document.getElementsByClassName('input');
    const data = {};
    for(i of inputs){
        data[i.id] = i.value;
    }
    console.log(data);
    const userId = sessionStorage.getItem('userId');
    makeRequest('POST', 'http://localhost:8080/GamesApp/api/user/update/' + userId, JSON.stringify(data))
        .then(value => {
            console.log(value);
            for(i of inputs){
                i.disabled = true;
            }
            const updateBtn = document.getElementById('updateBtn');
            updateBtn.value = "Update";
            updateBtn.onclick = (event) => {
                event.stopPropagation(); //absorb click
                enableInputs();
            };
        });
}

function deleteAccount() {
    //window.confirm("test");
    const userId = sessionStorage.getItem('userId');
    makeRequest('DELETE', 'http://localhost:8080/GamesApp/api/user/delete/' + userId)
        .then(value => {
            console.log(value);
        })
}

function updatePassword() {
    const pwd = document.getElementById('pwd').value;
    const cpwd = document.getElementById('cpwd').value;
    if(pwd === cpwd) {
        const userId = sessionStorage.getItem('userId');
        const data = { 'password' : pwd };
        makeRequest('POST', 'http://localhost:8080/GamesApp/api/user/update/' + userId, JSON.stringify(data))
            .then (value => {
                console.log(value);
            });
    } else {
        window.alert("passwords arent the same");
    }
}