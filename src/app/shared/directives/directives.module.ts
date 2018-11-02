import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@shared';
import { RxBoxDirective } from './rx-box.directive';
import { AsideDirective } from './aside.directive';
import { Flex10Directive } from './flex-1-0.directive';
import { LoadingDirective } from './loading.directive';

const directives = [
    RxBoxDirective,
    Flex10Directive,
    AsideDirective,
    LoadingDirective,
]

@NgModule({
  imports: [
    NgxSharedModule
  ],
  declarations: [...directives],
  exports: [...directives],
})
export class DirectivesModule { }
