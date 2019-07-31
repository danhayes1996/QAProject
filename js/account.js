function loadAccount (){
    const userId = sessionStorage.getItem('userId');
    if(userId) {
        makeRequest('GET', BASE_URL + USERS + GET + '/' + userId)
            .then (value => {
                //console.log(value);
                if(value.error) {
                    window.location = "login.html";
                } else {
                    populatePage(value);
                }
            });
    } else {
        window.location = "login.html";
    }
}

function populatePage(userInfo) {
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
    showSaveBtn();
    document.getElementById('cancelBtn').style.display = "block";
}

function disableInputs() {
    const inputs = document.getElementsByClassName('input');
    for(i of inputs){
        i.disabled = true;
    }
    document.getElementById('cancelBtn').style.display = "none";
}

function updateUserInfo() {
    const inputs = document.getElementsByClassName('input');
    const data = {};
    for(i of inputs){
        data[i.id] = i.value;
    }
    //console.log(data);
    const userId = sessionStorage.getItem('userId');
    makeRequest('POST', BASE_URL + USERS + UPDATE + '/' + userId, JSON.stringify(data))
        .then(value => {
            //console.log(value);
            disableInputs();
            showUpdateBtn();
        });
}

function cancelUserInfoUpdate(){
    disableInputs();
    loadAccount();
    showUpdateBtn();
}

function showUpdateBtn() {
    const updateBtn = document.getElementById('updateBtn');
    updateBtn.value = "Update";
    updateBtn.onclick = (event) => {
        event.stopPropagation(); //absorb click
        enableInputs();
    };
}

function showSaveBtn() {
    const updateBtn = document.getElementById('updateBtn');
    updateBtn.value = "Save";
    updateBtn.onclick = (event) => {
        event.stopPropagation(); //absorb click
        updateUserInfo();
    };
}

function updatePassword() {
    const pwd = document.getElementById('pwd');
    const cpwd = document.getElementById('cpwd');
    if(pwd.value === cpwd.value && pwd.value !== "") {
        const userId = sessionStorage.getItem('userId');
        const data = { 'password' : pwd.value };
        makeRequest('POST', BASE_URL + USERS + UPDATE + '/' + userId, JSON.stringify(data))
        .then (value => {
            console.log(value);
            if(value.error) {
                window.alert("Password couldnt be updated.");
            } else { 
                pwd.value = cpwd.value = "";
                window.alert("Your password has been updated");
            }
        });
    } else {
        pwd.value = cpwd.value = "";
        window.alert("passwords arent the same");

    }
}

function deleteAccount() {
    //window.confirm("test");
    const userId = sessionStorage.getItem('userId');
    makeRequest('DELETE', BASE_URL + USERS + REMOVE + '/' + userId)
        .then(value => {
            console.log(value);
            window.alert("Your account has been deleted, you will be returned to the home page.");
            sessionStorage.removeItem('userId');
            window.location = "home.html";
        })
}

function signOut() {
    sessionStorage.removeItem('userId');
    window.location = "home.html";
}