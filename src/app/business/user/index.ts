import { UserSettingsComponent,CropDialog } from './user-settings/user-settings.component';
import { UserTasksComponent } from './profile/user-tasks/user-tasks.component';
import { NgModule } from '@angular/core';
import { 
    DirectivesModule,
    HeaderMenuLayoutModule,
    NgxSharedModule,
    PipesModule,
} from '@shared';
import {
    // NzCardModule,
    // NzGridModule,
    // NzButtonModule,
    // NzDividerModule,
    // NzTabsModule,
    // NzListModule,
    // NzAvatarModule,
    NgZorroAntdModule,
} from 'ng-zorro-antd';
import {
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
} from '@angular/material';

import { UserRoutingModule } from './index-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PswResetComponent } from './psw-reset/psw-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { UserIssuesComponent } from './profile/user-issues/user-issues.component';
import { UserSolutionsComponent } from './profile/user-solutions/user-solutions.component';
import { UserOverviewComponent } from './profile/user-overview/user-overview.component';
import { UserTopicsComponent } from './profile/user-topics/user-topics.component';
import { ImageCropperModule } from 'ngx-image-cropper';

const modules = [
    NgxSharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    // NzCardModule,
    // NzGridModule,
    // NzButtonModule,
    // NzDividerModule,
    // NzTabsModule,
    // NzListModule,
    // NzAvatarModule,
    NgZorroAntdModule,
    UserRoutingModule,
    ImageCropperModule,
    DirectivesModule,
    HeaderMenuLayoutModule,
    PipesModule,
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
    UserTasksComponent,
    UserSettingsComponent, 
    CropDialog
];
const services = [];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services],
    entryComponents:[UserSettingsComponent,CropDialog]
})
export class UserModule { }
