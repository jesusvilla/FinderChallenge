function searchResult() {
    var getBooks = function (title, force) {
        var listBooks = [];
        return new Promise(function (resolve, reject) {
            if (force || (title && title.length > 2)) {
                var titleParam = title.toLowerCase();
                setTimeout(function () {
                    $get(JSON_FILE).then(function (res) {
                        res.data.forEach(function (v) {
                            var titleValue = v.title.toLowerCase();
                            if (titleValue.indexOf(titleParam) + 1) {//Si contiene title
                                listBooks.push(v);
                            }
                        });
                        resolve(listBooks);
                    }).catch(reject);
                }, 600);
            } else {
                reject({ message: 'No valid' });
            }
        });
    };

    var createContent = function (obj) {
        return '<div class="pure-u-1-3 pure-u-md-1-4 content-item">' +
            '<div class="md-card">' +
            '<img src="' + obj.image + '" class="content-item-image" />' +
            '<div class="content-description">' +
            '<p class="title truncate">' + obj.title + '</p>' +
            '<p class="teaser">' + obj.teaser + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
    };

    var drawBooks = function (value, force) {
        getBooks(value, force).then(function (res) {
            var htmlContent = '';
            if (res.length) {
                res.forEach(function (v) {
                    htmlContent += createContent(v);
                });
            } else {
                htmlContent = 'No books to show';
            }
            contentSearch.innerHTML = htmlContent;
            isSubmit = false;
        }).catch(function () {
            isSubmit = false;
        });
    };


    var formSearch = $query('formSearch');
    var isSubmit = false;
    formSearch.onsubmit = function () {
        if (!$query('buttonSearch').disabled) {
            var contentSearch = $query('contentSearch');
            var search = $query('search');
            if (!isSubmit) {
                isSubmit = true;
                drawBooks(search.value);
            }
        }
        return false;
    };

    drawBooks('', true);
}