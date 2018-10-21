import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { UserRoutingModule } from './index-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PswResetComponent } from './psw-reset/psw-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UserIssuesComponent } from './profile/user-issues/user-issues.component';
import { UserSolutionsComponent } from './profile/user-solutions/user-solutions.component';
import { UserOverviewComponent } from './profile/user-overview/user-overview.component';
import { UserTopicsComponent } from './profile/user-topics/user-topics.component';

const modules = [
    UserRoutingModule,
    SharedModule,
    MatSharedModule,
];
const components = [
    SignInComponent, 
    SignUpComponent, 
    PswResetComponent, 
    ProfileComponent,
    UserOverviewComponent,
    UserSolutionsComponent,
    UserIssuesComponent,
    UserTopicsComponent,
];
const services = [];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class UserModule { }
