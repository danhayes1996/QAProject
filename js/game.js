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

