import { Injectable } from '@angular/core';

@Injectable()
export class ListFilterService {
    type: string;

    constructor() { }

    init(type) {
        this.type = type;
    }

    getOwnerFilter() {
        if(this.type === undefined) {
            return [];
        }
        if(this.type === 'issues') {

        }
        else if (this.type === 'solutions') {

        }
        else if (this.type === 'tasks') {

        }
    }

    getOrganizationFilter() {
        if(this.type === undefined) {
            return [];
        }
        if(this.type === 'issues') {

        }
        else if (this.type === 'solutions') {

        }
        else if (this.type === 'tasks') {

        }
    }

    getSortFilter() {
        if(this.type === undefined) {
            return [];
        }
        if(this.type === 'issues') {

        }
        else if (this.type === 'solutions') {

        }
        else if (this.type === 'tasks') {

        }
    }

}