import { Injectable } from '@angular/core';

@Injectable()
export class ModelToolService {

constructor() { }

getModelList(params){
    postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire', {
        serviceId: 'getModelList',
        params: {},
        callback: 'MODEL_TOOL_CHANNEL#getModelList'
    });
}

getModelDetail(params){
    postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire', {
        serviceId: 'getModelDetail',
        params: params,
        callback: 'MODEL_TOOL_CHANNEL#getModelDetail'
    });
}

}