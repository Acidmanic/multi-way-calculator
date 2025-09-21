
function createFirstOrderRcFilter() {

    return {
        name: 'First Order RC Filter',
        parameters: [
            {
                name: 'R',
                displayName:'Resistance',
                units: [
                    {
                        name: '&Omega;',
                        coEfficient: 1
                    },
                    {
                        name: 'k&Omega;',
                        coEfficient: 1000
                    },
                    {
                        name: 'M&Omega;',
                        coEfficient: 1000000
                    }
                ],
                defaultValue: 5,
                defaultUnit: 1000
            },
            {
                name: 'C',
                displayName:'Capacitance',
                units: [
                    {
                        name: 'F',
                        coEfficient: 1
                    },
                    {
                        name: 'mF',
                        coEfficient: 0.001
                    },
                    {
                        name: '&mu;F',
                        coEfficient: 0.000001
                    },
                    {
                        name: 'nF',
                        coEfficient: 0.000000001
                    },
                    {
                        name: 'pF',
                        coEfficient: 0.000000000001
                    }
                ],
                defaultValue: 100,
                defaultUnit: 0.000000001
            },
            {
                name: 'F',
                displayName:'Frequency',
                units: [
                    {
                        name: 'MH',
                        coEfficient: 1000000
                    },
                    {
                        name: 'kH',
                        coEfficient: 1000
                    },
                    {
                        name: 'H',
                        coEfficient: 1
                    }
                ],
                defaultValue: 1,
                defaultUnit:1
            }
        ],
        calculate: function (params) {

            var r = readRawValue(params['R']);
            var c = readRawValue(params['C']);
            var f = readRawValue(params['F']);

            var result = null;

            if (r && c) {
                f = 1/(2*Math.PI*r*c);
                result = packResult(this,'F',f);
            } else if (f && r) {
                c = 1/(2*Math.PI*r*f);
                result = packResult(this,'C',c);
            } else if (f && c) {
                r = 1/(2*Math.PI*c*f);
                result = packResult(this,'R',r);
            }
            if (result) {
                return { supported: true, result: result };
            }
            return { supported: false, result: null };
        }
    };
}
