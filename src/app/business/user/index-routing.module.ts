import { UserTasksComponent } from './profile/user-tasks/user-tasks.component';
import { UserTopicsComponent } from './profile/user-topics/user-topics.component';
import { UserOverviewComponent } from './profile/user-overview/user-overview.component';
import { UserSolutionsComponent } from './profile/user-solutions/user-solutions.component';
import { UserIssuesComponent } from './profile/user-issues/user-issues.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PswResetComponent } from './psw-reset/psw-reset.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderMenuLayoutComponent } from '@shared/components/header-menu-layout/header-menu-layout.component'; 
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full',
            },
            {
                path: 'profile',
                component: ProfileComponent,
                children:[
                    {path:'',redirectTo:'user-overview',pathMatch:'full'},
                    {
                        path:'user-overview',
                        component:UserOverviewComponent,
                    },{
                        path:'user-solutions',
                        component:UserSolutionsComponent,
                    },{
                        path:'user-topics',
                        component:UserTopicsComponent,
                    },{
                        path:'user-tasks',
                        component:UserTasksComponent,
                    }
                ]
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: 'password-reset',
                component: PswResetComponent
            },{
                path:'set-up',
                component:UserSettingsComponent
            },
        ]
    },
    {
        path: 'sign-in',
        component: SignInComponent
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
