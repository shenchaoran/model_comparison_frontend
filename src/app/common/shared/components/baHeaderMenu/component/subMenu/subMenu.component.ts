// TODO divider
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { LoginService } from '@feature/login/login.service';
import { HeaderMenuMetaInfo } from '../../baHeaderMenu';

@Component({
    selector: 'ogms-subMenu',
    templateUrl: './subMenu.component.html',
    styleUrls: ['./subMenu.component.scss']
})
export class SubMenuComponent implements OnInit, AfterViewInit {
    @Input() isRoot: boolean = false;
    _subMenu: HeaderMenuMetaInfo;
    @Input()
    set subMenu(v) {
        this._subMenu = v;
        // console.log(v.path);
    }
    get subMenu() {
        return this._subMenu;
    }
    constructor(
        private loginService: LoginService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        //   jQuery('.disabled-menu-item:hover').css('color', '#eeeeee');
    }

    signOut() {
        this.loginService.loginOut();
        postal
            .channel('MENU')
            .publish('logout');
    }
}
