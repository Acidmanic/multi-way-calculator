
function createAllModels(){

    return[
        createSecondOrderRcFilter(),
        createFirstOrderRcFilter(),
        createDbPerDecadeCalculator(),
        createOhmExample(),
    ];
}