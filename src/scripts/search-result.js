function searchResult() {
    var getBooks = function (title, force) {
        var listBooks = [];
        return new Promise(function (resolve, reject) {
            if (force || (title && title.length > 2)) {
                var titleParam = replaceDiacritics(title).toLowerCase();
                setTimeout(function () {
                    $get(JSON_FILE).then(function (res) {
                        res.data.forEach(function (v) {
                            var titleValue = replaceDiacritics(v.title).toLowerCase();
                            if (titleValue.indexOf(titleParam) + 1) {//Si contiene title
                                listBooks.push(v);
                            }
                        });
                        resolve(listBooks);
                    }).catch(reject);
                }, 800);//Simulate ajax
            } else {
                reject({ message: 'No valid' });
            }
        });
    };

    var createContent = function (obj) {
        var divElement = document.createElement('div');
        divElement.innerHTML = '<div class="pure-u-1-3 pure-u-md-1-4 content-item">' +
            '<div class="md-card">' +
            '<img src="' + obj.image + '" class="content-item-image" />' +
            '<div class="content-description">' +
            '<p class="title truncate">' + obj.title + '</p>' +
            '<p class="teaser">' + obj.teaser + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
        return divElement.firstChild;
    };

    var formSearch = $query('formSearch');
    var isSubmit = false;

    var paginatorBook = null;
    var countPageBook = 0;

    var loadMore = function () {
        if (paginatorBook && !isSubmit) {
            isSubmit = true;
            var pageActual = paginatorBook.getPage(countPageBook);
            if (pageActual.length) {
                pageActual.forEach(function (v) {
                    var domContent = createContent(v);
                    contentSearch.appendChild(domContent);
                });
                countPageBook++;
                setTimeout(function () {
                    isSubmit = false;
                }, 1500);//Simulate ajax
            } else {
                isSubmit = false;
            }
        }
    };

    var initPaginator = function (res) {
        paginatorBook = new Paginator(res, 6);
        countPageBook = 0;
        contentSearch.innerHTML = '';
        isSubmit = false;
        loadMore();
    };

    var drawBooks = function (value, force) {
        getBooks(value, force).then(initPaginator).catch(function () {
            isSubmit = false;
        });
    };

    formSearch.onsubmit = function () {
        if (!$query('buttonSearch').disabled) {
            var contentSearch = $query('contentSearch');
            var search = $query('search');
            if (!isSubmit) {
                drawBooks(search.value);
            }
        }
        return false;//Para no recargar la página;
    };

    drawBooks('', true);

    /************  Este evento viene de filter *************** */
    document.addEventListener('filter', function (e) {
        $get(JSON_FILE).then(function (res) {
            var id = e.detail.id;
            var filter = e.detail.filter;
            var resFilter = [];
            res.data.forEach(function (v) {
                var isAdd = false;
                v[filter].forEach(function (w) {
                    if (w == id) {//id puede ser string y w un número
                        isAdd = true;
                    }
                });
                if (isAdd) {
                    resFilter.push(v);
                }
            });
            initPaginator(resFilter);
        });
    }, false);

    /***************** Agregando Infinite Scroll *************** */
    var domScroll = document.body;
    window.addEventListener('scroll', function (e) {
        if (domScroll.scrollTop + domScroll.clientHeight >= domScroll.scrollHeight) {
            loadMore();
        }
    });
}