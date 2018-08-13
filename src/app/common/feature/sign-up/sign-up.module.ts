import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@common/ngx-shared';
import { SignUpComponent } from './sign-up.component';
import { SignUpService } from './sign-up.service';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
    imports: [
        NgxSharedModule,
        SignUpRoutingModule
    ],
    declarations: [
        SignUpComponent
    ],
    providers: [
        SignUpService
    ]
})
export class SignUpModule { }
