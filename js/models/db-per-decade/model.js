
function createDbPerDecadeCalculator() {

    return {
        name: 'Db Per Decade Calculator',
        circuit: DB_PER_DECADE_PLOT_ICON,
        parameters: [
            {
                name: 'A1',
                displayName: 'First Point Amplitude',
                units: [
                    {
                        name: 'db',
                        coEfficient: 1
                    }
                ],
                defaultValue: 0.0,
                defaultUnit: 1
            },
            {
                name: 'F1',
                displayName: 'First Point Frequency',
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
                defaultValue: 50,
                defaultUnit: 1
            },
            {
                name: 'A2',
                displayName: 'Second Point Amplitude',
                units: [
                    {
                        name: 'db',
                        coEfficient: 1
                    }
                ],
                defaultValue: -0.5,
                defaultUnit: 1
            },
            {
                name: 'F2',
                displayName: 'Second Point Frequency',
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
                defaultValue: 400,
                defaultUnit: 1
            },
            {
                name: 'S',
                displayName: 'Steep',
                units: [
                    {
                        name: 'db/decade',
                        coEfficient: 1
                    }
                ],
                defaultValue: 1,
                defaultUnit: 1
            },
        ],
        calculate: function (params) {

            var a1 = readRawValue(params['A1']);
            var a2 = readRawValue(params['A2']);
            var f1 = readRawValue(params['F1']);
            var f2 = readRawValue(params['F2']);
            var s = readRawValue(params['S']);

            if (a1 != null && a2 != null && f1 != null && f2 != null) {
                s = (a1 - a2) / Math.log10(f1 / f2);
                return { supported: true, result: packResult(this, 'S', s) };
            }

            if (s != null && a2 != null && f1 != null && f2 != null) {
                a1 = s * Math.log10(f1 / f2) + a2;
                return { supported: true, result: packResult(this, 'A1', a1) };
            }

            if (a1 != null && s != null && f1 != null && f2 != null) {
                a2 = a1 - s * Math.log10(f1 / f2);
                return { supported: true, result: packResult(this, 'A2', a2) };
            }

            if (a1 != null && a2 != null && s != null && f2 != null) {
                f1 = f2 * Math.pow(10, (a1 - a2) / s);
                return { supported: true, result: packResult(this, 'F1', f1) };
            }

            if (a1 != null && a2 != null && f1 != null && s != null) {
                f2 = f1 / Math.pow(10, (a1 - a2) / s);
                return { supported: true, result: packResult(this, 'F2', f2) };
            }

            return { supported: false, result: null };
        }
    };
}
