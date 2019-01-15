import { ConversationComponent } from '../conversations/conversation/conversation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderMenuLayoutComponent } from '@shared';
import { TestComponent } from './test.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FileUploaderTestComponent } from './file-uploader-test/file-uploader-test.component';
import { GridSiteComponent } from '../ol/grid-site/grid-site.component';
import { TestTableComponent } from './test-table/test-table.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: TestComponent,
                children: [
                    {
                        path: 'reactive-form',
                        component: ReactiveFormComponent
                    },
                    {
                        path: 'file-uploader',
                        component: FileUploaderTestComponent
                    },
                    {
                        path: 'site-map',
                        component: GridSiteComponent
                    },
                    {
                        path: 'conversation',
                        component: ConversationComponent
                    }, 
                    {
                        path: 'table',
                        component: TestTableComponent
                    },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule { }
