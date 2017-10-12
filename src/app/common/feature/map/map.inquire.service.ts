import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { ServiceMetaInfoService } from '../../core/services/serviceMetaInfo.service';
import { ServiceMetaInfo } from '../../core/metainfo/service.metaInfo';

@Injectable()
export class MapInquireService { //implements Resolve<any>

    private subscriptions: Array<any>;
    private identifyQueryColl: Array<any>;
    private channel:any;

    constructor() {
        this.subscriptions = new Array<any>();
        this.identifyQueryColl = new Array<any>();

        this.channel = postal.channel('MAP_INQUIRE_CHANNEL');


    }

    // resolve() {

    // }

    subscribeTopics(){
        this.subscriptions.push(
            this.channel.subscribe('identifyQueryColl.add', (data, envelope)=> {
                let id = data.id;
                let serviceId = data.serviceId;
                let templateId = data.templateId;

                this.identifyQueryColl.push({'id': id, 'serviceId': serviceId, 'templateId': templateId});
            })
        );

        this.subscriptions.push(
            this.channel.subscribe('identifyQueryColl.remove', (data, envelope)=> {
                _.remove(this.identifyQueryColl, (item)=> {
                    return item.id === data.id;
                });
            })
        );

        this.subscriptions.push(
            this.channel.subscribe('map.identifyQuery', (data, envelope)=> {

                this.identifyQuery(data.mapPoint);
            })
        );
    }

    unsubscribeTopics(){
        _.forEach(this.subscriptions, (topic)=>{
            postal.unsubscribe(topic);
        });
    }

    private identifyQuery(mapPoint) {
        let queryResults: Array<any> = new Array<any>();

        _.forEach(this.identifyQueryColl, (item)=> {
            let params = new Array<any>();
            params.push(mapPoint);

            postal.channel('DATA_INQUIRE_CHANNEL')
                .publish('data.inquire.get', {
                                            'serviceId': item.serviceId,
                                            'templateId': item.templateId,
                                            'query': {'POINTWKT': mapPoint, 'PageSize': 10, 'PageNo': 1},
                                            'callback': 'MAP_INQUIRE_CHANNEL#identifyQuery.callback'
                                        });
        });

        let subscribeCount = 0;
        let subscription = this.channel.subscribe('identifyQuery.callback', (data, envelope)=> {

            if(data){
                postal.channel('MAP_CHANNEL').publish('map.showQueryResults', { type: 'iQuery', result: data.result});
            } else {
                postal.channel('MESSAGEBOX_CHANNEL').publish('show', {type: 'info', content: '未查询到结果', duration: 3000});
            }
        });
    }

    test(){
        let serviceId = 'mock8fe2-198a-4a76-80a1-58439ce22f90';
        let templeateId = 'cfd28fe2-198a-4a76-80a1-58439ce22f90';

        let subscribe = postal.channel('TEST_CHANNEL').subscribe('showQueryResults', (data, envelope) => {

            postal.unsubscribe(subscribe);
            postal.channel('MAP_CHANNEL').publish('map.showQueryResults', { type: 'test', result: data.result });
        });

        postal.channel('DATA_INQUIRE_CHANNEL')
                .publish('data.inquire.get', {
                                            'serviceId': serviceId,
                                            // 'templateId': templeateId,
                                            'query': null,
                                            'callback': 'TEST_CHANNEL#showQueryResults'
                                        });
    }
}
