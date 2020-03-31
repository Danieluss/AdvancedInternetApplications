import '../scss/style.scss';

var $ = document.querySelector.bind(document);

export function List(schema, table_selector) {
    var this_list = this;

    this.item_map = {}
    var table = $(table_selector);

    var id_increment = 0;

    function row_id(id) {
        return `row${id}`;
    }

    function on_off_input(id, name, value, editable) {          
        if (editable)
            return `<input id="${name}${id}" type="${schema[name]}" value="${value === undefined ? '' : value}">`;

        return `${value}`;
    }

    function actions(id, editable) {
        var acc = "";
        if (editable) {
            acc = `<button id="save${id}">Save</button>`
        } else {
            acc = `<button id="edit${id}">Edit</button>`
        }
        acc += `<button id="remove${id}">Remove</button>`
        return acc;
    }

    function add_edit_callbacks(id) {
        Object
            .keys(schema)
            .forEach(function(schema_key) {
                var element = $(`#${schema_key}${id}`);
                element.addEventListener("change", function() {
                    this.item_map[id][schema_key] = element.value;
                }.bind(this_list));
            });
        $(`#save${id}`).addEventListener('click', function() {
            this.set_editable(id, false);
        }.bind(this_list));
        $(`#remove${id}`).addEventListener('click', function() {
            this.remove(id);
        }.bind(this_list));
    }

    function add_save_callbacks(id) {
        $(`#edit${id}`).addEventListener('click', function() {
            this.set_editable(id, true);
        }.bind(this_list));
        $(`#remove${id}`).addEventListener('click', function() {
            this.remove(id);
        }.bind(this_list));
    }

    function item_html(item) {
        return `
            <tr id="${row_id(item.__META__.id)}">` +
                Object
                    .keys(schema)
                    .map(function(key) {
                        return `
                            <td>
                                ${on_off_input(item.__META__.id, key, item[key], item.__META__.editable)}
                            </td>`;
                    })
                    .join("") +
                `<td>${actions(item.__META__.id, item.__META__.editable)}</td>
            </tr>`;
    }

    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function item_element(item) {
        return htmlToElement(item_html(item));
    }

    this.remove = function(id) {
        table.removeChild($("#" + row_id(id)));
        delete this.item_map[id];
    }

    this.alloc = function() {
        var new_id = id_increment++;
        this.item_map[new_id] = {...schema};
        Object.assign(this.item_map[new_id], {"__META__": {"editable": true, "id": new_id}});
        var new_item_element = item_element(this.item_map[new_id]);
        table.insertAdjacentElement("beforeend", new_item_element);
        add_edit_callbacks(new_id);
    }

    this.set_editable = function (id, bool) {
        this.item_map[id].__META__.editable = bool;
        var refreshed_item_element = item_element(this.item_map[id]);
        table.replaceChild(refreshed_item_element, $("#" + row_id(id)));
        
        if (bool)
            add_edit_callbacks(id);
        else
            add_save_callbacks(id);
    }

};