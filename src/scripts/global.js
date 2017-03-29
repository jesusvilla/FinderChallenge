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

var $get = function (url) {
    //Si no funciona Promise, usar polyfill
    return new Promise(function (resolve) {
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

function replaceDiacritics(str){
  var diacritics = [
    {char: 'A', base: /[\300-\306]/g},
    {char: 'a', base: /[\340-\346]/g},
    {char: 'E', base: /[\310-\313]/g},
    {char: 'e', base: /[\350-\353]/g},
    {char: 'I', base: /[\314-\317]/g},
    {char: 'i', base: /[\354-\357]/g},
    {char: 'O', base: /[\322-\330]/g},
    {char: 'o', base: /[\362-\370]/g},
    {char: 'U', base: /[\331-\334]/g},
    {char: 'u', base: /[\371-\374]/g},
    {char: 'N', base: /[\321]/g},
    {char: 'n', base: /[\361]/g},
    {char: 'C', base: /[\307]/g},
    {char: 'c', base: /[\347]/g}
  ];
  diacritics.forEach(function(letter){
    str = str.replace(letter.base, letter.char);
  });
  return str;
};

var Paginator = function (list, chunk) {
    this.list = list || [];
    this.data = [];
    this.chunk = chunk || 10;
    this.page = -1;
    this.total = Math.ceil(this.list.length / this.chunk);
    this.next();
};
Paginator.prototype.next = function () {
    if ((this.page + 1) < this.total) {
        this.page++;
        for (var i = (this.page * this.chunk); i < (this.chunk * (this.page + 1)) && i < this.list.length; i++) {
            this.data.push(this.list[i]);
        }
        return true;
    } else {
        return false;
    }
};
Paginator.prototype.getPage = function (item) {
    var res = [];
    if (item < this.total) {
        for (var i = (item * this.chunk); i < (this.chunk * (item + 1)) && i < this.list.length; i++) {
            res.push(this.list[i]);
        }
        this.page = item;
    }
    return res
};
