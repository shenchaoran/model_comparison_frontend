import {
    OnInit,
    Input,
    Output,
    EventEmitter,
    Component,
    ComponentFactoryResolver,
    HostListener,
    ComponentFactory,
    ComponentRef,
    ViewContainerRef,
    ReflectiveInjector,
    ElementRef,
    ViewChild,
    OnChanges,
    SimpleChange,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    AfterViewInit,
    Renderer2,
} from '@angular/core';
// declare let GoldenLayout: any;
import * as GoldenLayout from 'golden-layout';

@Component({
    selector: 'ogms-cmp-tabs-view',
    templateUrl: './cmp-tabs-view.component.html',
    styleUrls: ['./cmp-tabs-view.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmpTabsViewComponent implements OnInit, OnChanges, AfterViewInit {
    
    _loading = true;

    @Input() config: any;
    @Input() childComponents: {
        name: string,
        component: any
    }[];
    @ViewChild('layout') private layout: GoldenLayout;

    constructor(
        private el: ElementRef,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private elRef: ElementRef
        // private cdRef: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        let hadChanged;
        _.forIn(changes, (v, k) => {
            if (v.previousValue) {
                if (!_.isEqual(v.currentValue, v.previousValue)) {
                    hadChanged = true;
                }
            }
        });
        if (hadChanged) {
            console.log('changed');
            this.initLayout();
        }
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // this.initLayout();
    }

    initLayout() {
        if (this.config && this.childComponents) {

            this.viewContainer.clear();
            if (this.layout && this.layout.destroy) {
                this.layout.destroy();
            }

            this.layout = new GoldenLayout(this.config, $(this.el.nativeElement).find('#layout'));
            _.map(this.childComponents, childComponent => {
                this.layout.registerComponent(childComponent.name, (container, componentState) => {
                    const factory = this.componentFactoryResolver.resolveComponentFactory(childComponent.component);
                    var compRef = this.viewContainer.createComponent(factory);
                    // 给组件的属性传值
                    _.forIn(componentState, (v, key) => {
                        compRef.instance[key] = v;
                    });
                    container.getElement().append(compRef.location.nativeElement);
                    container['compRef'] = compRef;
                    compRef.changeDetectorRef.detectChanges();
                });
            });

            this.renderer.setStyle($(this.el.nativeElement).find('#layout')[0], 'height', '600px');
            this.layout.on('initialised', () => {
                this.layout.updateSize();
            });
            this.layout.init();
            this.layout.on('itemDestroyed', item => {
                if (item.container) {
                    let compRef = item.container["compRef"];
                    if (compRef) {
                        compRef.destroy();
                    }
                }
            });
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.layout) {
            this.layout.updateSize();
        }
    }

}
