/*
  constants and global functions
*/

var JSON_FILE = '/books-schema.json';

/*
 @method loadJSON
 source: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
*/
var loadJSON = function (url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true);
    xobj.onreadystatechange = function (responseText) {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var content = JSON.parse(xobj.responseText);
            callback.call(this, content);
        }
    };
    xobj.send(null);
};

var $get = function(url){
    //Si no funciona Promise, usar polyfill
    return new Promise(function(resolve){
        loadJSON(url, resolve);
    });
};

var $query = function (selector, isNotId) {
    if (!isNotId) {
        return document.getElementById(selector);
    } else {
        return document.querySelector(selector);
    }
};
