function signup() {
    const inputs = document.getElementsByClassName('registerInput');
    const data = {};
    for(input of inputs) {
        data[input.id] = input.value;
    }

    makeRequest('POST', BASE_URL + USERS + CREATE, JSON.stringify(data))
        .then(value => {
            if(value.error){
                clearErrorDiv();
                const errDiv = document.getElementById('registerError');
                errDiv.style.display = "block";

                const p = document.createElement('p');
                p.innerText = value.message;
                errDiv.append(p);
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