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
            return undefined;
        }
        if(this.type === 'issues') {
            
        }
        else if (this.type === 'solutions') {

        }
        else if (this.type === 'tasks') {

        }
        return [
            {
                label: 'Created',
                value: 'Created',
                checked: false
            },
            {
                label: 'Followed',
                value: 'Followed',
                checked: false
            }
        ];
    }

    getOrganizationFilter() {
        if(this.type === undefined) {
            return undefined;
        }
        if(this.type === 'issues') {

        }
        else if (this.type === 'solutions') {

        }
        else if (this.type === 'tasks') {

        }
        return [
            {
                label: 'OGMS',
                value: 'OGMS',
                checked: false
            },
            {
                label: 'SUMS',
                value: 'SUMS',
                checked: false
            }
        ];
    }

    getSortFilter() {
        if(this.type === undefined) {
            return undefined;
        }
        if(this.type === 'issues') {

        }
        else if (this.type === 'solutions') {

        }
        else if (this.type === 'tasks') {

        }
        return [
            {
                label: 'Most followed',
                value: 'Most followed',
                checked: false
            },
            {
                label: 'Least followed',
                value: 'Least followed',
                checked: false
            },
            {
                label: 'Newest',
                value: 'Newest',
                checked: false
            },
            {
                label: 'Oldest',
                value: 'Oldest',
                checked: false
            }
        ];
    }

}