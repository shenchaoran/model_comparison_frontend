import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { UserRoutingModule } from './user-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PswResetComponent } from './psw-reset/psw-reset.component';

import { UserService } from '../services';
import { ProfileComponent } from './profile/profile.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UserIssuesComponent } from './profile/user-issues/user-issues.component';
import { UserSolutionsComponent } from './profile/user-solutions/user-solutions.component';
import { UserOverviewComponent } from './profile/user-overview/user-overview.component';
import { UserTopicsComponent } from './profile/user-topics/user-topics.component';

@NgModule({
    imports: [
        UserRoutingModule,
        SharedModule,
        MatSharedModule,
        NgZorroAntdModule,
    ],
    declarations: [SignInComponent, SignUpComponent, PswResetComponent, ProfileComponent, UserIssuesComponent, UserSolutionsComponent, UserOverviewComponent, UserTopicsComponent],
    providers: [
        UserService
    ]
})
export class UserModule { }
