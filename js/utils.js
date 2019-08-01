function makeRequest(method, url, body) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                if(xhr.responseText !== ''){
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Error couldnt get response text "' + xhr.responseText + '"');
                }
            } else {
                reject('Error (' + xhr.status + ')' + xhr.responseText);
            }
        };
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body || null);
    });
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