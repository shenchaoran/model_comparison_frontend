import { Injectable } from '@angular/core';
import { Tasks } from "./task-data.mock";

@Injectable()
export class MockService {
    getTask() {
        return Tasks;
    }
}