function loadGame() {
    const gameId = sessionStorage.getItem('gameId');
    makeRequest('GET', 'http://localhost:8080/GamesApp/api/game/getGame/' + gameId)
        .then(value => {
            //put results on the pages
            console.log(value);
            createPageLayout(value);
        }).catch(reason => {
            //print error message  
            console.log(reason);
        });
}

function createPageLayout(game) {
    const parentDiv = document.getElementById('content');
    const div = document.createElement('div');
    div.className = "card";

    const header = document.createElement('div');
    header.className = "card-header";
    header.innerText = capitalizeWords(game.name) + ' (YEAR)' ;
    div.append(header);

    const description = document.createElement('div');
    description.className = 'card-body';
    description.innerText = game.description;
    div.append(description);

    parentDiv.append(div);
    createReviews(game.reviews, parentDiv);
}

function createReviews(reviews, parentDiv) {
    const div = document.createElement('div');
    div.className = "card";
   
    const header = document.createElement('div');
    header.className = "card-header";
    header.innerText = 'Reviews';
    div.append(header);
   
    for(const review of reviews) {
        createReviews(review, div);
    }

    parentDiv.append(div);
}

function createReview(review, parentDiv) {
    
}

function fixVarNames(v) {
    v = v[0].toUpperCase() + v.substring(1);
    for(let i = 1; i < v.length; i++) {
        if(v[i] === v[i].toUpperCase()) {
            v = v.substring(0, i) + " " + v.substring(i);
            i++;
        }
    }
    return v;
}

function capitalizeWords(s) {
    s = s[0].toUpperCase() + s.substring(1);
    for(let i = 1; i < s.length; i++) {
        if(s[i - 1] === ' ') {
            s = s.substring(0, i) + s[i].toUpperCase() + s.substring(i + 1);
        }
    }
    return s;
}