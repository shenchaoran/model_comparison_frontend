import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@common/ngx-shared';
import { SignUpComponent } from '@common/feature/sign-up/sign-up.component';
import { SignUpService } from '@common/feature/sign-up/sign-up.service';
import { SignUpRoutingModule } from '@common/feature/sign-up/sign-up-routing.module';

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
