

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

function packResult(calculationModel, parameterName, value) {

    var vParam = findParamsFor(calculationModel, parameterName);
    var result = unitBack(value, vParam);
    return result;
}


function getUnitByCoEfficient(parameter, coEfficient) {

    for (let index = 0; index < parameter.units.length; index++) {

        const unit = parameter.units[index];

        if (unit.coEfficient == coEfficient) return unit;
    }
    return { name: '', coEfficient: 1 };
}


function defaultParametersFor(calculationModel, parameterName) {

    var paramModel = {};

    for (let index = 0; index < calculationModel.parameters.length; index++) {

        const parameter = calculationModel.parameters[index];

        if (parameter.name != parameterName) {

            paramModel[parameter.name] = {
                value: parameter.defaultValue,
                unit:getUnitByCoEfficient(parameter,parameter.defaultUnit)
            };
        }
    }

    return paramModel;

}


function supportedCalculations(calculationModel) {

    var supportResult = {parameters:[], outputables:[],nonOutputables:[],byName:{}};

    for (let index = 0; index < calculationModel.parameters.length; index++) {
        
        const parameter = calculationModel.parameters[index];

        var calculationParamModel = defaultParametersFor(calculationModel,parameter.name);

        var calculationResult = calculationModel.calculate(calculationParamModel);

        var entry = {};


        entry.parameter = parameter;
        entry.supported = calculationResult.supported;
        entry.defaultResult = calculationResult.result;
        
        supportResult.parameters.push({...parameter,calculationSupported:calculationResult.supported});
        supportResult.byName[parameter.name]=entry;
        
        if(entry.supported){
            supportResult.outputables.push(entry);
        } else{
            supportResult.nonOutputables.push(entry);
        }
    }

    return supportResult;

}