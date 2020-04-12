// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function request(url, method = 'GET', requestHeaders, params, bodyParams) {
    return new Promise(function(resolve, reject) {
        const httpRequest = new XMLHttpRequest();

        if (!!requestHeaders) {
            $.each(requestHeaders, (key, val) => {
                httpRequest.setRequestHeader(key, val);
            });
        }

        if (!!params) {
            if (url.contains('?')) {
                url += '&';
            } else {
                url += '?';
            }
            url += params
        }

        httpRequest.open(method, url);
        httpRequest.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(httpRequest.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        };
        httpRequest.onerror = function () {
            reject({
                status: this.status,
                statusText: this.statusText
            });
        };
        httpRequest.send(bodyParams);
    });
}

function consoleLog(object) { 
    console.log(JSON.stringify(object));
}


// 0: domain not found
// request("http://unknown.domain.1325saadfa324234.com")
//     .then(consoleLog)
//     .catch(consoleLog);

// 200
// request("http://www.google.com")
// .then(consoleLog)
// .catch(consoleLog);

// 404
// request("https://www.google.com/unknown/url")
// .then(consoleLog)
// .catch(consoleLog);