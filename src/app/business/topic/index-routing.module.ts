import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMenuLayoutComponent } from '@shared/components/header-menu-layout/header-menu-layout.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: TopicListComponent
            },
            {
                path: 'create',
                component: CreateTopicComponent,
            },
            {
                path: ':id',
                component: TopicDetailComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
