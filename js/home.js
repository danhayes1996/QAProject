function signIn(){
    window.location = "login.html";
}

function signUp(){
    window.location = "register.html";
}

function checkForGames() {
    document.getElementById("searchResults").style.display = "block";
}

function hideResults(){
    document.getElementById("searchResults").style.display = "none";
}

function load(){
    makeRequest('GET', 'url/for/api/function')
        .then(value => {
            //put results on the pages
        }).catch(reason =>{
            //print error message  
        });
}

function createGame(data){
    const gameDiv = document.createElement('div');
    /* for each element in data, add element to div */
    
    return gameDiv;
}

function makeDivElement(tag, text, className, parentDiv){
    const e = document.createElement(tag);

    if(text) { e.innerText = text; }
    if(className) { e.className = className; }
    if(parentDiv) { parentDiv.append(e); }
    
    return e;
}