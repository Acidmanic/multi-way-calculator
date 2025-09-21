

const icons = {
    chevronDoubleRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/></svg>'
}

function writeInto(elementName, content) {
    let element = document.getElementById(elementName);

    if (element) {
        element.innerHTML = content;
    } else {
        console.log('unable to find element named: ' + elementName, 'Content', content);
    }
}

function writeIntoInput(parameterName, value, unitCoEfficient) {

    let elementName = 'txt' + parameterName;
    let dropName = 'drp-units-' + parameterName;

    let input = document.getElementById(elementName);
    let drop = document.getElementById(dropName);

    if (input && drop) {
        input.value = value;

        drop.value = unitCoEfficient;

    } else {
        console.log('unable to find element named: ' + elementName, 'value', value);
    }
}


function objectToBase64(obj) {
    let objJsonStr = JSON.stringify(obj);
    let objJsonB64 = btoa(objJsonStr);
    return objJsonB64;
}


function base64ToObject(objJsonB64) {

    let objJsonStr = atob(objJsonB64);
    let obj = JSON.parse(objJsonStr);
    return obj;
}

function createInputs(parameters, changeProcessMethodName, selectCallBack) {

    var elements = '';
    var ids = [];
    const qt = "'";
    let lastParameterName = '';

    for (let index = 0; index < parameters.length; index++) {

        let param = parameters[index];

        let id = 'txt' + param.name;
        let label = param.name;

        ids.push(id);


        let dropId = 'drp-units-' + param.name;

        let formLabel = '<label for="' + id + '">' + param.displayName + '<small> (' + label + ')</small>' + '</label>';

        let paramsB64 = objectToBase64(param);

        let readLabel = 'document.getElementById(' + qt + dropId + qt + ').value';

        let readInput = 'document.getElementById(' + qt + id + qt + ').value';

        let call = changeProcessMethodName + '(' + readInput + ',' + readLabel + ',' + qt + id + qt + ',' + qt + paramsB64 + qt + ')';

        let input = '<input class="form-control" onkeypress="' + call + '" onchange="' + call + '" type="number" id="' + id + '"' + ' value="' + param.defaultValue + '" />';

        let drop = '<select id="' + dropId + '" class="form-control" style="width:16px" onchange="' + call + '">';

        for (let uIdx = 0; uIdx < param.units.length; uIdx++) {

            const unit = param.units[uIdx];

            let selected = '';

            if (unit.coEfficient == param.defaultUnit) selected = ' selected ';

            drop += '<option' + selected + ' value="' + unit.coEfficient + '">' + unit.name + '</option>';
        }

        drop += '</select>';
        let outputId = 'mrk-output-' + label;


        let selectHandler = '(function(){setSelected(' + qt + label + qt + '),' + selectCallBack + '(' + qt + label + qt + ');})()';

        let outputMarker = '<div id="' + outputId + '" onclick=' + selectHandler + ' class="outputmarker input-group-text text-success" style="width:48px; font-size: 1.2rem;"></div>';

        elements += '<div class="row py-1 form-group input-group input-group-append">' + formLabel + outputMarker + input + drop + '</div>\n';

        lastParameterName = label;
    }



    return {
        content: elements,
        idList: ids,
        reset: function () { setSelected(lastParameterName); new Function(selectCallBack + '(' + qt + lastParameterName + qt + ')')(); }
    };
}


function setSelected(parameterName) {

    let found = document.getElementsByClassName('outputmarker');

    for (let index = 0; index < found.length; index++) {

        found[index].innerHTML = ' ';

    }

    let outputId = 'mrk-output-' + parameterName;
    let element = document.getElementById(outputId);
    if (element) {
        element.innerHTML = icons.chevronDoubleRight;
    }
}
