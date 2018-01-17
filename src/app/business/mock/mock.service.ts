import { Injectable } from '@angular/core';

import { Tasks } from "./task.mock";
import { Models } from "./model.mock";
import { Datas } from "./data.mock";
import { Solutions } from "./solution.mock";

@Injectable()
export class MockService {
    getTask() {
        return Tasks;
    }

    getModels() {
        return Models;
    }

    getDatas() {
        return Datas;
    }

    getSolutions() {
        return Solutions;
    }
}