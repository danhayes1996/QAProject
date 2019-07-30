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

    const {reviews, ...other} = game;

    createGame(other, parentDiv);

    parentDiv.append(div);
    if(reviews) {
        createReviews(reviews, div);
    }
}

function createGame(game, parentDiv) {
    const header = document.createElement('div');
    header.className = "card-header";
    header.innerText = capitalizeWords(game.name) + ' (YEAR)' ;
    parentDiv.append(header);

    const description = document.createElement('div');
    description.className = 'card-body';
    description.innerText = game.description;
    parentDiv.append(description);
}

function createReviews(reviews, parentDiv) {
    const div = document.createElement('div');
    div.className = "card";
   
    const header = document.createElement('div');
    header.className = "card-header";
    header.innerText = 'Reviews';
    div.append(header);
   
    for(const review of reviews) {
        createReview(review, div);
    }

    parentDiv.append(div);
}

function createReview(review, parentDiv) {
    
}

