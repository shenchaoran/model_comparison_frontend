import * as _ from 'lodash';

export class CmpMethod {
    label: string;
    value: string;

    private static METHODS = {
        TABLE_RAW: [
            {
                label: 'Chart',
                value: 'TABLE_CHART',
                checked: false
            },
            {
                label: 'Statistic',
                value: 'TABLE_STATISTIC',
                checked: false
            }
        ],
        SHAPEFILE_RAW: [
            {
                label: 'Visualization',
                value: 'SHAPEFILE_VISUALIZATION',
                checked: false
            },
            {
                label: 'Statistic',
                value: 'SHAPEFILE_STATISTIC',
                checked: false
            },
            {
                label: 'Interpolation',
                value: 'SHAPEFILE_INTERPOLATION',
                checked: false
            }
        ],
        ASCII_GRID_RAW: [
            {
                label: 'Visualization',
                value: 'ASCII_GRID_VISUALIZATION',
                checked: false
            },
            {
                label: 'Statistic',
                value: 'ASCII_GRID_STATISTIC',
                checked: false
            },
            {
                label: 'GIF',
                value: 'GIF',
                checked: false
            }
        ]
    };

    static find(schemaName: string) {
        return _.cloneDeep(_.get(CmpMethod.METHODS, schemaName));
    }
}
