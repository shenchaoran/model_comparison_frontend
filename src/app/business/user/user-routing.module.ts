import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PswResetComponent } from './psw-reset/psw-reset.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderMenuLayoutComponent } from '@shared/components/header-menu-layout/header-menu-layout.component';

const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: SignUpComponent
            }
        ]
    },
    {
        path: 'password-reset',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: PswResetComponent
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
