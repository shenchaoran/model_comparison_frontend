import {
    Component,
    OnInit,
    OnChanges,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    QueryList,
    ViewChildren,
    ElementRef,
    forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    IMatCascader,
    IMatCascaderView,
    IMatCascaderContainer,
} from './mat-cascader.interface';
import {
    MatCascaderService,
} from './mat-cascader.service';
import {
    MatMenuTrigger,
    MatMenu,
} from '@angular/material';
import { NgModelBase } from '../classes/ngModel.class';
import { cloneDeep, map } from 'lodash';

@Component({
    selector: 'ngx-mat-cascader',
    templateUrl: './mat-cascader.component.html',
    styleUrls: ['./mat-cascader.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatCascaderComponent),
            multi: true
        }
    ]
})
export class MatCascaderComponent extends NgModelBase {
    _data: IMatCascader[] = [];
    @Input()
    set data(v) {
        this._data = cloneDeep(v);
    }
    get data() { return this._data; }
    @Input()
    onlyLeaf = true;

    @Input()
    get value() {
        return this._innerValue;
    }
    set value(nV) {
        // if (this._innerValue !== nV) {
        //     if (!this._innerValue)
        //         this._innerValue = [];
            this._innerValue.splice(0);
            map(nV, item => this._innerValue.push(item));
            // this._innerValue = nV;
            this.propagateChange(111);
            this.valueChange.emit(this._innerValue);
        // }
    }
    @Output()
    valueChange = new EventEmitter<(string | number)[]>();

    @Input()
    placeholder = '';

    @Input()
    separate = ' / ';

    valueText = '';


    @ViewChildren(MatMenu)
    matMenus: QueryList<MatMenu>;
    matMenuContainers: IMatCascaderContainer[] = [];
    root: MatMenu | null;

    constructor(
        private _matCascaderService: MatCascaderService,
    ) {
        super();

        this._innerValue$.subscribe(v => {
            if (!!v) {
                this._initContainers();
                setTimeout(() => {
                    this._initRefs();
                });
            }
        });
    }

    private _initContainers() {
        this.matMenuContainers = this._flatten(this.data);
        this._setValueTextByValue(this.value);
    }

    private _initRefs() {
        this.matMenuContainers.forEach(item => {
            const el = this.matMenus.find((menu => (menu['_elementRef'] as ElementRef).nativeElement.id === item.id)) as MatMenu;

            setTimeout(() => {
                if (item.parent === null) {
                    this.root = el;
                } else {
                    item.parent.childRef = el;
                }
            });
        });
    }

    onMenuItemClick(menu: IMatCascaderView): void {
        if (this.onlyLeaf) {
            this._setValueOfLeaf(menu);
        } else {
            this._setValueOfPath(menu);
        }
    }

    private _setValueOfLeaf(menu: IMatCascaderView): void {
        if (menu.children !== undefined) {
            return;
        }

        this._setValueOfPath(menu);
    }

    private _setValueOfPath(menu: IMatCascaderView): void {
        this.value = this._getValueByMenu(menu).reverse();
        this.valueText = this._getValueTextByMenu(menu);
    }

    private _setValueTextByValue(value: (string | number)[]): void {
        // value = value || this.value;

        const text = this._getTextByValue(this.data, value);

        this.valueText = this._getValueTextByTexts(text);
    }

    private _getTextByValue(data: IMatCascader[], value: (string | number)[]): string[] {
        const [curr, ...rest] = value;

        if (!curr) {
            return [];
        }

        const node = data.find(item => item.value === curr) as IMatCascader;

        if (!node) {
            console.log('Can not find value: ', curr, 'in: ', this);
            return [];
        }

        let result: string[] = [];
        result.push(node.text);

        if (rest && node.children) {
            result = result.concat(this._getTextByValue(node.children, rest));
        }

        return result;
    }

    private _getValueByMenu(menu: IMatCascaderView): (string | number)[] {
        let _value: (string | number)[] = [];
        _value.push(menu.value);

        if (menu.container !== undefined && menu.container.parent !== null) {
            _value = _value.concat(this._getValueByMenu(menu.container.parent));
        }

        return _value;
    }

    private _getValueTextByMenu(menu: IMatCascaderView): string {
        let _text: string[] = [];
        _text.push(menu.text);

        if (menu.container !== undefined && menu.container.parent !== null) {
            _text = _text.concat(this._getValueTextByMenu(menu.container.parent));
        }

        return this._getValueTextByTexts(_text.reverse());
    }

    private _getValueTextByTexts(texts: string[]): string {
        return texts.join(this.separate);
    }

    private _flatten(before: IMatCascaderView[] = [], parent: IMatCascaderView | null = null): IMatCascaderContainer[] {
        let after: IMatCascaderContainer[] = [];

        const menu: IMatCascaderContainer = {
            id: this._matCascaderService.id,
            menus: before,
            parent,
        };

        after.push(menu);

        before.forEach(view => {
            view.container = menu;

            if (view.children && Object.prototype.toString.call(view.children) === '[object Array]') {
                after = after.concat(this._flatten(view.children, view));
            }
        });

        return after;
    }
}
