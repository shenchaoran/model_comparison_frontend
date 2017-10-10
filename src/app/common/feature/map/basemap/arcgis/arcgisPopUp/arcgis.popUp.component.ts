import {Component, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'arcgis-popup',
    templateUrl: './arcgis.popUp.component.html',
    styleUrls:  ['./arcgis.popUp.component.css']
})
export class ArcgisPopUp {
    @Input() popContent:any;

    close = new EventEmitter();

    constructor() {
        
    }

    linkShowMore(linkInfo){
        if(linkInfo.type === "service"){
            let params = new Object();

            /* 只需要传主键 */
            _.forOwn(this.popContent.popId, function(value, key) {
                params[key] = value;
            });
            
            postal.channel("DATA_ACQUISITION_CHANNEL").publish(linkInfo.value, params);
        } else if(linkInfo.type === "event"){
            let params = new Object();
            _.forOwn(this.popContent.popId, function(value, key) {
                params[key] = value;
            });

            let channel = _.split(linkInfo.value, '#')[0];
            let topic = _.split(linkInfo.value, '#')[1];

            postal.channel(channel).publish(topic, params);
        } else if(linkInfo.type === "hyperlink"){
            (window).open(linkInfo.value, '_blank');
        }
        
    }

    onClickedExit() {
        this.close.emit('event');
    }
}