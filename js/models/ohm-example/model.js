
function createOhmExample() {

    return {
        name: 'Ohm Example',
        circuit:OHM_LAW_ICON,
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
                defaultValue: 10,
                defaultUnit: 1000
            },
            {
                name: 'I',
                displayName:'Current',
                units: [
                    {
                        name: 'A',
                        coEfficient: 1
                    },
                    {
                        name: 'mA',
                        coEfficient: 0.001
                    },
                    {
                        name: '&mu;A',
                        coEfficient: 0.000001
                    }
                ],
                defaultValue: 100,
                defaultUnit: 0.001
            },
            {
                name: 'V',
                displayName:'Voltage',
                units: [
                    {
                        name: 'kV',
                        coEfficient: 1000
                    },
                    {
                        name: 'V',
                        coEfficient: 1
                    },
                    {
                        name: 'mV',
                        coEfficient: 0.001
                    },
                    {
                        name: '&mu;V',
                        coEfficient: 0.000001
                    }
                ],
                defaultValue: 1,
                defaultUnit:1
            }
        ],
        calculate: function (params) {

            var r = readRawValue(params['R']);
            var i = readRawValue(params['I']);
            var v = readRawValue(params['V']);
            var result = null;
            if (r && i) {
                v = i * r;
                result = packResult(this,'V',v);
            } else if (v && r) {
                i = v / r;
                result = packResult(this,'I',i);
            } else if (v && i) {
                r = v / i;
                result = packResult(this,'R',r);
            }
            if (result) {
                return { supported: true, result: result };
            }
            return { supported: false, result: null };
        }
    };
}
