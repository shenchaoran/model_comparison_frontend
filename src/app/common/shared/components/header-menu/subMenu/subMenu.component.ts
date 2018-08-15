// TODO divider
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { LoginService } from '@common/feature/login/login.service';

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

export class HeaderMenuMetaInfo {
    path: string;
    disabled: boolean;
    data?: {
        menu: {
            title: string;
            id?: string;
            icon?: string;
            selected?: boolean;
            expanded?: boolean;
            order?: number
        }
    };
    children?: Array<HeaderMenuMetaInfo>;

    constructor(){}
}