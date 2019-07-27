function makeRequest(method, url, body) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                //console.log('response text: ', xhr.responseText);
                if(xhr.responseText !== ''){
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //console.log('response type: ', xhr.responseType);
                    reject('Error couldnt get response text "' + xhr.responseText + '"');
                }
            } else {
                reject('Error (' + xhr.status + ')' + xhr.responseText);
            }
        };
        xhr.open(method, url);
        // if(method === 'POST' ){
        // }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body || null);
    });
}