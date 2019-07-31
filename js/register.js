function signup() {
    const inputs = document.getElementsByClassName('registerInput');
    const data = {};
    for(input of inputs) {
        data[input.id] = input.value;
    }
    //console.log(data);

    makeRequest('POST', BASE_URL + USERS + CREATE, JSON.stringify(data))
        .then(value => {
            if(value.error){
                // console.log(value);
                clearErrorDiv();
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

function checkPasswords() {
    const pass = document.getElementById('password');
    const cpass = document.getElementById('cpassword');

    const submitBtn = document.getElementById('submitBtn');
    const errDiv = document.getElementById('registerError');
    if(pass.value !== cpass.value) {
        clearErrorDiv();
        const p = document.createElement('p');
        p.innerText = "Your passwords do not match.";
        errDiv.append(p);
        errDiv.style.display = "block";

        submitBtn.disabled = true;
    } else {
        clearErrorDiv();
        errDiv.style.display = "none";
        submitBtn.disabled = false;
    }
}

function clearErrorDiv() {
    const errDiv = document.getElementById('registerError');
    while(errDiv.lastChild) {
        errDiv.removeChild(errDiv.lastChild);
    }
}