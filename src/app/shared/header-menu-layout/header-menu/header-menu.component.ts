import { Component, OnInit, Input } from '@angular/core';
import { HeaderMenuService } from '../header-menu.service';

@Component({
  selector: 'ogms-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() menuItems: Array<any>;
    subscriptions: Array<any> = new Array();
    constructor(private service: HeaderMenuService) {}

    ngOnInit() {
        
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
     
    }
}
