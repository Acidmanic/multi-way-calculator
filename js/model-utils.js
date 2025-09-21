

function readRawValue(parameter) {

    if (parameter) {
        return parameter.value * parameter.unit.coEfficient;
    }
    return null;
}


function unitBack(value, param) {

    var units = param.units;

    units.sort(function (a, b) { return a.coEfficient - b.coEfficient });

    var selectedUnit = units[0];

    for (let index = units.length - 1; index > 0; index--) {

        const unit = units[index];

        if (value >= unit.coEfficient) {
            selectedUnit = unit;
            break;
        }
    }
    return { value: value / selectedUnit.coEfficient, unit: selectedUnit, parameterName: param.name };
}

function findParamsFor(calculationModel, name) {

    for (let index = 0; index < calculationModel.parameters.length; index++) {
        const element = calculationModel.parameters[index];
        if (calculationModel.parameters[index].name == name) {

            return calculationModel.parameters[index];
        }
    }
    return [{ name: '', coEfficient: 1 }];
}

function packResult(calculationModel, parameterName,value) {

    var vParam = findParamsFor(calculationModel, parameterName);
    var result = unitBack(value, vParam);
    return result;
}


