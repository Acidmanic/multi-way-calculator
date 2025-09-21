
function createSecondOrderRcFilter() {

    return {
        name: 'Second Order RC Filter (-40db/decade)',
        circuit:SECOND_ORDER_FILTER_ICON,
        parameters: [
            {
                name: 'R1',
                displayName: 'Pre Feedback Resistor',
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
                name: 'R2',
                displayName: 'Post Feedback Resistor',
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
                name: 'C1',
                displayName: 'Feedback Capacitor',
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
                name: 'C2',
                displayName: 'Input Trap Capacitor',
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
                displayName: 'Cut Off Frequency',
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
                defaultUnit: 1
            }
        ],
        calculate: function (params) {

            var r1 = readRawValue(params['R1']);
            var r2 = readRawValue(params['R2']);
            var c1 = readRawValue(params['C1']);
            var c2 = readRawValue(params['C2']);
            var f = readRawValue(params['F']);

            if (r1 && r2 && c1 && c2) {
                f = 1 / (2 * Math.PI * Math.sqrt(r1 * c1 * r2 * c2));
                return { supported: true, result: packResult(this, 'F', f) };
            }
            if (f && r2 && c1 && c2) {
                r1 = 1 / (Math.pow(2 * Math.PI * f, 2) * (r2 * c1 * c2));
                return { supported: true, result: packResult(this, 'R1', r1) };
            }
            if (r1 && f && c1 && c2) {
                r2 = 1 / (Math.pow(2 * Math.PI * f, 2) * (r1 * c1 * c2));
                return { supported: true, result: packResult(this, 'R2', r2) };
            }
            if (r1 && r2 && f && c2) {
                c1 = 1 / (Math.pow(2 * Math.PI * f, 2) * (r1 * r2 * c2));
                return { supported: true, result: packResult(this, 'C1', c1) };
            }
            if (r1 && r2 && c1 && f) {
                c2 = 1 / (Math.pow(2 * Math.PI * f, 2) * (r1 * r2 * c1));
                return { supported: true, result: packResult(this, 'C2', c2) };
            }
            return { supported: false, result: null };
        }
    };
}
