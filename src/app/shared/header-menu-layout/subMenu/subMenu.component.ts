// TODO divider
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { UserService } from '@services';

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
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {}

    signOut() {
        this.userService.signOut();
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