import { User } from './../../models/user.class';
import { TaskService } from './../../services/task.service';
import { SolutionService } from './../../services/sln.service';
import { TopicService } from './../../services/topic.service';

import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../../services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Topic, Solution } from '@models';


@Component({
  selector: 'ogms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private router$: Subscription;
  user: User;
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
  userId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public topicService: TopicService,
    public slnService: SolutionService,
    public taskServic: TaskService,
  ) { }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
  }

  ngOnInit() {
    //TODO 获取 user 数据  不要直接从user中取，要从后台重新获取一遍
    this.userId = this.userService.user._id; 
    const url_userId = this.activatedRoute.snapshot.paramMap.get('id');
    if(url_userId&&url_userId!='user-overview'){
      this.userId = url_userId;
    }
    this.userService.getUserInfo(this.userId)
      .subscribe({
        next: res => {
          if (res.error) {
            alert(res.error.desc);
          } else {
            this.user = res.data.user;
            console.log(this.user);
            this.router$ = this.router.events
              .pipe(filter(e => e instanceof ActivationEnd))
              .subscribe(() => this.setActive());
            this.setActive();
            console.log("userid:" + this.user._id);
            this.topicService.findByUserId(this.user._id).subscribe(res => { });
            this.slnService.findByUserId(this.user._id).subscribe(res => { });
            this.taskServic.findByUserId(this.user._id).subscribe(res => { });
          }
        },
        error: e => {
          console.error(e);
        }
      });
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
