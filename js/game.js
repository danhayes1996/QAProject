function loadGame() {
    setupNav();
    const gameId = sessionStorage.getItem('gameId');
    makeRequest('GET', BASE_URL + GAMES + GET_GAME + '/' + gameId)
        .then(game => {
            makeRequest('GET', BASE_URL + REVIEWS + GET_BY_GAME + '/'+ gameId)
                .then(reviews => {
                    // console.log(value);
                    createPageLayout(game, reviews);

                }).catch(reason => {
                    console.log(reason);
                });

        }).catch(reason => {
            console.log(reason);
        });
}

function createPageLayout(game, reviews) {  
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

    createReviews(reviews, gameDiv);
}

function setupWriteReview(parentDiv) {
    const userId = sessionStorage.getItem('userId');
    if(userId) {
        createWriteReview(parentDiv);
    } else {
        createRequireAccount(parentDiv);
    }
}

function createWriteReview(parentDiv){
    const div = document.createElement('div');
    div.className = 'writeReview';

    const title = createElement('input', '', 'reviewTxt');
    title.id = "userReviewTitle";
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Review Title...');
    div.append(title);

    const content = createElement('textarea', '', 'reviewTB');
    content.id = "userReviewContent";
    content.setAttribute('rows', '5');
    content.setAttribute('placeholder', 'Review Content...');
    div.append(content);
    
    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'button');
    submitBtn.setAttribute('value', 'Submit Review');
    submitBtn.id = "submitBtn";
    submitBtn.onclick = (event) => { sendReview(); };

    parentDiv.append(div, submitBtn);
}

function createRequireAccount(parentDiv) {
    const div = document.createElement('div');
    div.className = "writeReviewWrapper";

    const pInfo = document.createElement('p');
    pInfo.innerText = "You must be signed in to write a review";

    const divBtns = document.createElement('div');
    divBtns.className = "accountBtns";

    const bSignin = document.createElement('input');
    bSignin.className = "signin";
    bSignin.setAttribute('type', 'button');
    bSignin.setAttribute('value', 'Sign In');
    bSignin.onclick = (event) => { window.location = "login.html"; };
    
    const bSignup = document.createElement('input');
    bSignup.setAttribute('type', 'button');
    bSignup.setAttribute('value', 'Sign Up');  
    bSignup.onclick = (event) => { window.location = "register.html"; };  
    
    divBtns.append(bSignin, bSignup);
    div.append(pInfo, divBtns);
    parentDiv.append(div);
}

function createReviews(reviews, parentDiv) {
    const div = document.createElement('div');
    div.className = "card";
   
    const header = document.createElement('div');
    header.className = "card-header";
    header.innerText = 'Reviews';
    div.append(header);
   
    setupWriteReview(div);

    if(reviews.length > 0) {
        for(const review of reviews) {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            createReview(review, reviewDiv);
            div.append(reviewDiv);
        }
    } else {
        const p = document.createElement('p');
        p.innerText = "Looks like there are no reviews for this game yet. Be the first to write a review";
        p.className = "text-center";
        div.append(p);
    }
    parentDiv.append(div);
}

function createReview(review, parentDiv) {
    console.log(review);
    const header = document.createElement('div');
    header.className = "reviewHeader d-flex";

    createElement('h6', review.title, 'reviewTitle card-title', header);
    createElement('p', ' - ' + review.user.firstName + ' ' + review.user.lastName, 'reviewUser text-muted', header);

    const content = createElement('div', review.content, 'card-body reviewContent');
    const upvotes = document.createElement('div');
    upvotes.className = "reviewUpvote";

    const p = createElement('p', 'Upvotes: ' + review.upvotes, '', upvotes);
    const like = document.createElement('input');
    like.setAttribute('type', 'button');
    like.setAttribute('value', 'Upvote');
    like.id ="upvoteBtn";
    like.onclick = (event) => {
        console.log('pre upvote', review.upvotes);
        sendUpvote(review.id, review.upvotes
             + 1);
        console.log('post upvote', review.upvotes);
    };

    const dislike = document.createElement('input');
    dislike.setAttribute('type', 'button');
    dislike.setAttribute('value', 'Downvote');
    dislike.id ="downvoteBtn";
    dislike.onclick = (event) => {
        sendUpvote(review.id, review.upvotes - 1);
    };

    p.append(like, dislike);

    parentDiv.append(header, content, upvotes);
}

function sendReview() {
    const userId = sessionStorage.getItem('userId');
    const gameId = sessionStorage.getItem('gameId');

    let userData = {};
    userData['title'] = document.getElementById('userReviewTitle').value;
    userData['content'] = document.getElementById('userReviewContent').value;

    makeRequest('POST', BASE_URL + REVIEWS + CREATE + '/' + userId + '/' + gameId, JSON.stringify(userData)) 
        .then(value => {
            if(value.error) {
                console.log(value.message);
            } else {
                window.location = "game.html";
            }
        });
}

function sendUpvote(reviewId, upvotes) {
    const userData = "{\"upvotes\":" + upvotes + "}";
 
    makeRequest('POST', BASE_URL + REVIEWS + UPDATE + '/' + reviewId, userData)
        .then(value => {
            window.location = "game.html";
        });
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

function createElement(tag, content, className, parentDiv){
    const e = document.createElement(tag);
    if(content) { e.innerText = content; }
    if(className) { e.className = className; }
    if(parentDiv) { parentDiv.append(e); }
    return e;
}

function signOut() {
    sessionStorage.removeItem('userId');
    window.location = "game.html";
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