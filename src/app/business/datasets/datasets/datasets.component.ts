import { Component, OnInit, Inject } from '@angular/core';
import { DatasetService, SchemaService } from '@services';
import { Router } from '@angular/router';
import { UDXSchema } from '@models';

@Component({
    selector: 'ogms-datasets',
    templateUrl: './datasets.component.html',
    styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
    _keys = Object.keys;
    stdList: any[];
    selectedSTD: any;
    stdTags: { [label: string]: any[] } = {};

    constructor(
        @Inject('API') private api,
        private datasetService: DatasetService,
        private router: Router,
        private schemaService: SchemaService,
    ) { }

    ngOnInit() {
        this.datasetService.findAll().subscribe(res => {
            if (!res.error) {
                this.stdList = res.data;
                _.map(this.stdList, std => {
                    _.map(std.tags, tag => {
                        if (!this.stdTags.hasOwnProperty(tag))
                            this.stdTags[tag] = []
                        this.stdTags[tag].push(std)
                    })
                });

                if (this.stdList && this.stdList.length > 0) {
                    this.onDatasetSelected(this.stdList[0])
                }
            }
        });
    }

    onDatasetSelected(std) {
        if(!_.isEqual(this.selectedSTD, std)) {
            this.selectedSTD = _.cloneDeep(std);
            this.selectedSTD.schema = this.schemaService.getById(this.selectedSTD.schemaId)
        }
    }

    onDataClick(dataset, entry) {
        window.open(`${this.api.backend}/std-data/${dataset._id}/${entry.name}`);
    }
}
