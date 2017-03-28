function searchForm() {
    var search = $query('search');
    search.onkeyup = function (e) {
        var size = this.value.length;
        var buttonSearch = $query('buttonSearch');
        buttonSearch.disabled = !(size > 2);
    };
    var maxTitles = 7;
    var getTitles = function () {
        var listSearch = [];
        return new Promise(function (resolve, reject) {
            $get(JSON_FILE).then(function (res) {
                res.data.forEach(function (v) {
                    var title = v.title;
                    var exist = listSearch.indexOf(title) + 1;
                    if (!exist /*&& listSearch.length < maxTitles*/) {
                        listSearch.push(title);
                    }
                });
                resolve(listSearch);
            }).catch(reject);
        });
    };

    getTitles().then(function (listSearch) {
        new Awesomplete(search, {
            minChars: 3,
            maxItems: maxTitles,
            list: listSearch//Ajax
        });
    })
}
