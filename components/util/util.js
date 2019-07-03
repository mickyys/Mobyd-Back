'use strict';
const request = require('request').defaults({ encoding: null });

///funcion convierte url en codigo base 64
function getUrltoImageBase64(url){
    return new Promise((resolve, reject) => {
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                resolve(data);
            }
        });
    });
}

module.exports.getUrltoImageBase64 = getUrltoImageBase64;