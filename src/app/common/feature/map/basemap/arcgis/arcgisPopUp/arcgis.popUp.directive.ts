import {
  Directive,
  ComponentFactoryResolver,
  ComponentRef
} from "@angular/core";

import { ViewContainerRef } from "@angular/core";
import { ArcgisPopUp } from "./arcgis.popUp.component";

@Directive({
  selector: "arcgis-popup-anchor"
})
export class ArcgisPopUpAnchorDirective {
  private subscriptions: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.subscriptions = new Array<any>();

    let channel = postal.channel("POPUP_CHANNEL");
    this.subscriptions.push(
      channel.subscribe("popUp.show", (data, envelope) => {
        this.createMapPopUp(data);
      })
    );
  }

  ngOnDestroy() {
    _.forEach(this.subscriptions, topic => {
      postal.unsubscribe(topic);
    });
  }

  createMapPopUp(data: any): ComponentRef<ArcgisPopUp> {
    this.viewContainer.clear();

    let popUpComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ArcgisPopUp
    );
    let popUpComponentRef = this.viewContainer.createComponent(
      popUpComponentFactory
    );

    let popUpInstance = popUpComponentRef.instance;

    popUpInstance.popContent = data.popContent;

    let mapPopUpElement = jQuery(".popup-anchor").next();

    mapPopUpElement
      .detach()
      .prependTo(".esriPopup .esriPopupWrapper .contentPane");
    // jQuery('.esriPopup .contentPane').height(mapPopUpElement.children(':eq(0)').height());

    return popUpComponentRef;
  }

  private showEsriPopUp(flag) {
    if (flag) {
      jQuery(".esriPopup").removeClass("esriPopupHidden");
      jQuery(".esriPopup").addClass("esriPopupVisible");
    } else {
      jQuery(".esriPopup").removeClass("esriPopupVisible");
      jQuery(".esriPopup").addClass("esriPopupHidden");
    }
  }
}
