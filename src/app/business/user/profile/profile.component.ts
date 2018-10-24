
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../../services';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
    },{
      key:'user-topics',
      tab:'Topics'
    }, {
      key: 'user-solutions',
      tab: 'Solutions',
    },{
      key:'user-tasks',
      tab:'Results & Diagnostics',
    }
  ]

  pos = 0;

  constructor(
    private router: Router,
    private service: UserService,
  ) { }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
  }

  ngOnInit() {
    //* 获取 user 数据
    this.user = this.service.getMockuser();
    // console.log(this.user);
    this.router$ = this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.setActive());
    this.setActive();
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
