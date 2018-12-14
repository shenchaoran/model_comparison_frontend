import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PswResetComponent } from './psw-reset/psw-reset.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderMenuLayoutComponent } from '@shared'; 
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },{
        path: 'sign-out',
        component: SignInComponent
    },
    {
        path: ':userName',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path:'',
                component:ProfileComponent,
            }, 
            {
                path: 'password-reset',
                component: PswResetComponent
            },{
                path:'set-up',
                component:UserSettingsComponent
            }
        ]
    }, 
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
