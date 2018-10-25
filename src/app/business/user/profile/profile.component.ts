import { TopicService } from './../../services/topic.service';

import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../../services';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Topic } from '@models';

@Component({
  selector: 'ogms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private router$: Subscription;
  user: any;
  tabs: any[] = [
    {
      key: 'user-overview',
      tab: 'Overview',
    }, {
      key: 'user-topics',
      tab: 'Topics'
    }, {
      key: 'user-solutions',
      tab: 'Solutions',
    }, {
      key: 'user-tasks',
      tab: 'Results & Diagnostics',
    }
  ]
  pos = 0;
  get topicList(): Topic[] {
    return this.topicService.currentUser_topicList;
  }
  get topicCount(): Number {
    return this.topicService.currentUser_topicCount;
  }
  constructor(
    private router: Router,
    private userService: UserService,
    public topicService: TopicService,
  ) { }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
  }

  ngOnInit() {
<<<<<<< HEAD
    //TODO 获取 user 数据  不要直接从user中取，要从后台重新获取一遍
    this.user = this.userService.user;
    console.log(this.user);
=======
    //* 获取 user 数据
    this.user = this.service.getMockuser();
    // console.log(this.user);
>>>>>>> master
    this.router$ = this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.setActive());
    this.setActive();
    console.log("userid:"+ this.user._id);
    this.topicService.findByUserId(this.user._id).subscribe(res => { });

  }

  to(item: any) {
    this.router.navigateByUrl(`/user/profile/${item.key}`);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.router$.unsubscribe();
  }





}