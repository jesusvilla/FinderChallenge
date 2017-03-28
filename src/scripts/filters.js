function filters() {
    var domFilters = $query('filters');
    var htmlFilters = '';
    var traductions = {
        'categories': 'Categorías',
        'edition': 'Presentación',
        'lang': 'Idioma'
    };
    $get(JSON_FILE).then(function (res) {
        for (var k in res.entities) {
            if (traductions.hasOwnProperty(k)) {
                var values = res.entities[k][0];
                htmlFilters += '<div class="md-card m-b-10">';
                htmlFilters += '<div class="md-list">';
                htmlFilters += ('<div class="md-list-item">' + traductions[k] + '</div>');
                for (var j in values) {
                    htmlFilters += ('<div class="md-list-item">' + values[j].label + '</div>');
                }
                htmlFilters += '</div></div>';
            }
        }
        domFilters.innerHTML = htmlFilters;
    });
}