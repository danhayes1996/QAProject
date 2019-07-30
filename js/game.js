function loadGame() {
    setupNav();
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

    const subheading = document.getElementById('subheading');
    subheading.innerText = game.ageRating + ' - ' + game.year + ' - ' + game.company;

    const description = document.getElementById('description');
    description.innerText = game.description;

    const imageDiv = document.getElementById('image');
    const image = document.createElement('img');
    image.setAttribute('src', game.imageURL);
    image.className = "img-fluid";
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