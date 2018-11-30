import { Component, OnInit, Inject } from '@angular/core';
import { DatasetService } from '../../services';
import { Router } from '@angular/router';

@Component({
    selector: 'ogms-datasets',
    templateUrl: './datasets.component.html',
    styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
    _keys = Object.keys;
    stdList: any[];
    stdCount: number;
    selectedSTD: any;
    stdTags: { [label: string]: any[] } = {};

    constructor(
        @Inject('API') private api,
        private datasetService: DatasetService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.datasetService.findAll().subscribe(res => {
            if (!res.error) {
                this.stdList = res.data.docs;
                this.stdCount = res.data.count;
                _.map(this.stdList, std => {
                    _.map(std.tags, tag => {
                        if (!this.stdTags.hasOwnProperty(tag))
                            this.stdTags[tag] = []
                        this.stdTags[tag].push(std)
                    })
                });

                if (this.stdCount > 0) {
                    this.onDatasetSelected(this.stdList[0])
                }
            }
        });
    }

    onDatasetSelected(std) {
        if(!_.isEqual(this.selectedSTD, std))
            this.selectedSTD = _.cloneDeep(std);
    }

    onDataClick(dataset, entry) {
        window.open(`${this.api.backend}/std-data/${dataset._id}/${entry.name}`);
    }
}
