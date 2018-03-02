import { Routes, RouterModule }  from '@angular/router';

import { Login } from './login.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: Login,
        data: {
            title: 'Login'
        }
    }
];

export const routing = RouterModule.forChild(routes);
