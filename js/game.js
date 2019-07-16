function load(){
    //get gameId from session storage
    makeRequest('GET', 'url/for/api/function/gameId')
        .then(value => {
            //put results on the pages
        }).catch(reason =>{
            //print error message  
        });
}