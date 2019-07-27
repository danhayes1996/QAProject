function setupNav() {
    const sIn = document.getElementById('signin'); 
    const sUp = document.getElementById('signup'); 
    const sOut = document.getElementById('signout'); 
    const acc = document.getElementById('account'); 

    const userId = sessionStorage.getItem('userId');
    if(userId) {
        sIn.style.display = "none";
        sUp.style.display = "none";
        sOut.style.display = "block";
        acc.style.display = "block";
    } else {
        sIn.style.display = "block";
        sUp.style.display = "block";
        sOut.style.display = "none";
        acc.style.display = "none";
    }
}

function signIn() {
    window.location = "login.html";
}

function signUp() {
    window.location = "register.html";
}

function signOut() {
    sessionStorage.removeItem('userId');
    window.location = "home.html";
}

function checkForGames() {
    //check for games matching text
    clearSearchResults();
    const searchStr = document.getElementById('searchText').value.trim();
    if(searchStr === "") {
        hideResults();
        return;
    }

    const resultsDiv = document.getElementById('searchResults');
    makeRequest('GET', 'http://localhost:8080/GamesApp/api/game/getGames/' + searchStr)
        .then(value => {
            if(value && value.length > 0) {
                console.log("is array", Array.isArray(value), value)
                for(const key in value){
                    createGame(value[key], resultsDiv);
                }
                //display results
                document.getElementById("searchResults").style.display = "block";
            } else {
                console.log("hide");
                hideResults();
            }
        });
}

function createGame(game, parentDiv) {
    //console.log('game', game);
    const div = document.createElement('div');
    div.className = 'dropdown-item';
    div.addEventListener('click', (e) => {
        //console.log("div click");
        sessionStorage.setItem('gameId', game.id);
        window.location = "game.html";
    });

    const h = document.createElement('h3');
    h.innerText = game.name;
    const p = document.createElement('p');
    p.innerText = game.ageRating;
    div.append(h);
    div.append(p);
    parentDiv.append(div);
}

function clearSearchResults() {
    const resultsDiv = document.getElementById('searchResults');
    while(resultsDiv.lastChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }
}

function hideResults() {
    const resultDiv = document.getElementById("searchResults");
    if(resultDiv.style.display === "block") {
       resultDiv.style.display = "none";
    }
}

function makeDivElement(tag, text, className, parentDiv) {
    const e = document.createElement(tag);

    if(text) { e.innerText = text; }
    if(className) { e.className = className; }
    if(parentDiv) { parentDiv.append(e); }
    
    return e;
}