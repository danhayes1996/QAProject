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
    const gameDiv = document.getElementById('game');
    const header = document.getElementById('gameTitle');
    header.innerText = capitalizeWords(game.name);

    const description = document.getElementById('description');
    description.innerText = game.description;

    const imageDiv = document.getElementById('image');
    const image = document.createElement('img');
    image.setAttribute('src', game.imageURL);
    imageDiv.append(image);

    createReviews(game.reviews, gameDiv);
}

function createReviews(reviews, parentDiv) {
    const div = document.createElement('div');
    div.className = "card";
   
    const header = document.createElement('div');
    header.className = "card-header";
    header.innerText = 'Reviews';
    div.append(header);
   
    if(reviews) {
        for(const review of reviews) {
            createReview(review, div);
        }
    }
    parentDiv.append(div);
}

function createReview(review, parentDiv) {
    
}

