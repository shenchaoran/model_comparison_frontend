import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';

import { jqxBarGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';
import { jqxBulletChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbulletchart';
import { jqxButtonGroupComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttongroup';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { jqxCheckBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcheckbox';
import { jqxColorPickerComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcolorpicker';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { jqxComplexInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcomplexinput';
import { jqxDataTableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable';
import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxDockingComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdocking';
import { jqxDockingLayoutComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdockinglayout';
import { jqxDockPanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdockpanel';
import { jqxDragDropComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdragdrop';
import { jqxDrawComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdraw';
import { jqxDropDownListComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxEditorComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxeditor';
import { jqxExpanderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxexpander';
import { jqxFileUploadComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxfileupload';
import { jqxFormattedInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxformattedinput';
import { jqxGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgauge';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';
import { jqxKanbanComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxkanban';
import { jqxKnobComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxknob';
import { jqxLayoutComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlayout';
import { jqxLinearGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlineargauge';
import { jqxLinkButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlinkbutton';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { jqxListMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistmenu';
import { jqxLoaderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxloader';
import { jqxMaskedInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmaskedinput';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxNavBarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxnavbar';
import { jqxNavigationBarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxnavigationbar';
import { jqxNotificationComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxnotification';
import { jqxNumberInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxnumberinput';
import { jqxPanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpanel';
import { jqxPasswordInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpasswordinput';
import { jqxPivotDesignerComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpivotdesigner';
import { jqxPivotGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpivotgrid';
import { jqxPopoverComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpopover';
import { jqxProgressBarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxprogressbar';
import { jqxRadioButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxradiobutton';
import { jqxRangeSelectorComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxrangeselector';
import { jqxRatingComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxrating';
import { jqxRepeatButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxrepeatbutton';
import { jqxResponsivePanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxresponsivepanel';
import { jqxRibbonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxribbon';
import { jqxSchedulerComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxscheduler';
import { jqxScrollBarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxscrollbar';
import { jqxScrollViewComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxscrollview';
import { jqxSliderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { jqxSortableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxsortable';
import { jqxSplitterComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxsplitter';
import { jqxSwitchButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxswitchbutton';
import { jqxTabsComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtabs';
import { jqxTagCloudComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtagcloud';
import { jqxTextAreaComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtextarea';
import { jqxToggleButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtogglebutton';
import { jqxToolBarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtoolbar';
import { jqxTooltipComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtooltip';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import { jqxTreeMapComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreemap';
import { jqxValidatorComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxvalidator';
import { jqxWindowComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import { jqxDropDownButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';

const COMPONENTS = [
    jqxBarGaugeComponent,
    jqxBulletChartComponent,
    jqxButtonGroupComponent,
    jqxButtonComponent,
    jqxCalendarComponent,
    jqxChartComponent,
    jqxCheckBoxComponent,
    jqxColorPickerComponent,
    jqxComboBoxComponent,
    jqxComplexInputComponent,
    jqxDataTableComponent,
    jqxDateTimeInputComponent,
    jqxDockingComponent,
    jqxDockingLayoutComponent,
    jqxDockPanelComponent,
    jqxDragDropComponent,
    jqxDrawComponent,
    jqxDropDownListComponent,
    jqxEditorComponent,
    jqxExpanderComponent,
    jqxFileUploadComponent,
    jqxFormattedInputComponent,
    jqxGaugeComponent,
    jqxGridComponent,
    jqxInputComponent,
    jqxKanbanComponent,
    jqxKnobComponent,
    jqxLayoutComponent,
    jqxLinearGaugeComponent,
    jqxLinkButtonComponent,
    jqxListBoxComponent,
    jqxListMenuComponent,
    jqxLoaderComponent,
    jqxMaskedInputComponent,
    jqxMenuComponent,
    jqxNavBarComponent,
    jqxNavigationBarComponent,
    jqxNotificationComponent,
    jqxNumberInputComponent,
    jqxPanelComponent,
    jqxPasswordInputComponent,
    jqxPivotDesignerComponent,
    jqxPivotGridComponent,
    jqxPopoverComponent,
    jqxProgressBarComponent,
    jqxRadioButtonComponent,
    jqxRangeSelectorComponent,
    jqxRatingComponent,
    jqxRepeatButtonComponent,
    jqxResponsivePanelComponent,
    jqxRibbonComponent,
    jqxSchedulerComponent,
    jqxScrollBarComponent,
    jqxScrollViewComponent,
    jqxSliderComponent,
    jqxSortableComponent,
    jqxSplitterComponent,
    jqxSwitchButtonComponent,
    jqxTabsComponent,
    jqxTagCloudComponent,
    jqxTextAreaComponent,
    jqxToggleButtonComponent,
    jqxToolBarComponent,
    jqxTooltipComponent,
    jqxTreeComponent,
    jqxTreeGridComponent,
    jqxTreeMapComponent,
    jqxValidatorComponent,
    jqxWindowComponent,
    jqxDropDownButtonComponent
]

@NgModule({
    imports: [
        NgxSharedModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class JqxWidgetsModule { }
