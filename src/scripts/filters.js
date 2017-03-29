function filters() {
    var domFilters = $query('filters');
    var htmlFilters = '';
    var entities = {
        'categories': {
            'label': 'Categorías',
            'filter': 'categories',
            'isAll': true
        },
        'lang': {
            'label': 'Idioma',
            'filter': 'lang',
            'isAll': true,
            'isId': true
        },
        'edition': {
            'label': 'Presentación',
            'filter': 'mode',
            'isId': true
        }
    };

    var strToDate = function (strDate) {
        var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;//m/d/yyyy
        var arrayDate = strDate.match(pattern);
        return new Date(arrayDate[3], arrayDate[1] - 1, arrayDate[2]);
    };

    $get(JSON_FILE).then(function (res) {
        for (var k in entities) {
            var values = res.entities[k][0];
            htmlFilters += '<div class="md-card m-b-20">';
            htmlFilters += '<div class="md-list">';
            htmlFilters += ('<div class="md-list-item">' + entities[k].label + '</div>');
            if (entities[k].isAll) {
                htmlFilters += '<div class="md-list-item c-gray">Todos</div>';
            }

            for (var j in values) {
                var id = j;
                if (entities[k]['isId']) {
                    id = values[j].id
                }
                htmlFilters += (
                    '<div class="md-list-item valid" data-id="'
                    + id
                    + '" data-filter="'
                    + entities[k].filter
                    + '">'
                    + values[j].label
                    + '</div>');
            }
            htmlFilters += '</div></div>';
        }
        domFilters.innerHTML = htmlFilters;

        var domList = document.querySelectorAll('.md-list-item.valid');
        domList.forEach(function (v) {
            v.addEventListener('click', function (event) {
                var id = v.dataset.id;
                var filter = v.dataset.filter;
                var eventFilter = new CustomEvent('filter',
                    {
                        'detail': {
                            id: v.dataset.id,
                            filter: v.dataset.filter
                        }
                    }
                );
                document.dispatchEvent(eventFilter);
            })
        })
    });
}