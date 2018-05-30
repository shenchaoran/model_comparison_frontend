import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    Inject
} from '@angular/core';
import { StdDataService } from '../services/std-data.service';
import { MetDataService } from '../services/met-data.service';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { OgmsBaseComponent } from '@shared';
import { NzNotificationService,} from 'ng-zorro-antd';

@Component({
    selector: 'ogms-ibis-std-data',
    templateUrl: './ibis-std-data.component.html',
    styleUrls: ['./ibis-std-data.component.scss']
})
export class IbisStdDataComponent extends OgmsBaseComponent implements OnInit {
    _isVisible = false;
    _selectedEvent;
    @Input() std;
    @Input() set selectedEvent(v) {
        this._selectedEvent = v;
        this.fetchData(undefined, v);
    }
    @Output() onSiteSelected = new EventEmitter<any>();
    @Output() onEventCleared = new EventEmitter<any>();

    site: {
        id: string,
        data: {
            [key: string]: any
        }
    }

    constructor(
        private stdService: StdDataService,
        private route: ActivatedRoute,
        private metDataService: MetDataService,
        @Inject('BACKEND') private backend,
//private _notice: NzNotificationService,
    ) {
        super();
    }

    ngOnInit() {
        // this._subscriptions.push(
        //     this.route.queryParams
        //         .subscribe(params => {
        //             let stdId = params['id'];
        //             if (stdId) {
        //                 this.stdService.findOne(stdId)
        //                     .subscribe(response => {
        //                         if (!response.error) {
        //                             this.std = response.data;
        //                         }
        //                     });
        //             }
        //         })
        // );
    }

    fetchData(siteId, event) {
        // let emitChange = false;
        if (siteId) {
            this.site = {
                id: siteId,
                data: {}
            };
            this._isVisible = true;
            event = _.chain(this)
                .get('std.content.IO.inputs')
                .find(input => {
                    return input.id === '-s'
                })
                .value();
        }

        if (event && !_.get(this, 'site.data[event.id]')) {
            this._subscriptions.push(
                this.metDataService.getSTD_DATA('IBIS_STD_DATA', event.id, this.site.id)
                    .subscribe(
                        response => {
                            this.site.data[event.id] = this.processData(event.id, response);
                            // console.log(response);
                            this.onSiteSelected.emit(this.site.id);
                        },
                        e => {
                            console.log(e);
                            // this._notice.warning('Warning', 'No data found!');
                        }
                    )
            );
        }
    }

    processData(eventId, data) {
        if(eventId === '-i') {
            // return _.map(_.split(data, /\r\n|\r|\n/g), row => {
            //     if(row.trim() === ''){
            //         return;
            //     }
            //     else {
            //         return _.split(row, /\s+|\,/g);
            //     }
            // });
            return data;
        }
        else if(eventId === '-s') {
            return data;
        }
        else if(eventId === '-o') {
            return data;
        }
    }

    downloadData() {
        if (this._selectedEvent && this.site.id) {
            window.open(`http://${this.backend.host}:${this.backend.port}/std-data/IBIS_STD_DATA?eventId=${this._selectedEvent.id}&query=${this.site.id}`);
        }
    }

    clearEvent() {
        this.onEventCleared.emit();
    }

    _handleOk() {
        this._isVisible = false;
    }

    _handleCancel() {
        this._isVisible = false;
    }
}
