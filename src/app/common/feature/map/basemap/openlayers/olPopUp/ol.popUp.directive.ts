import {
  Directive,
  ComponentFactoryResolver,
  ComponentRef
} from "@angular/core";

import { ViewContainerRef } from "@angular/core";
import { OlPopUp } from "./ol.popUp.component";
import { XciePopUp } from "../xcie-popup/xcie-popup.component";

@Directive({
  selector: "ol-popup-anchor"
})
export class OlPopUpAnchorDirective {
  private sub_popUpShow: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    let channel = postal.channel("POPUP_CHANNEL");

    this.sub_popUpShow = channel.subscribe(
      "ol.popUp.show",
      (data, envelope) => {
        this.createMapPopUp(data);
      }
    );
    this.sub_popUpShow = channel.subscribe(
      "xcie.popUp.show",
      (data, envelope) => {
        this.createXciePopUp(data);
      }
    );
  }

  ngOnDestroy() {
    postal.unsubscribe(this.sub_popUpShow);
  }

  createMapPopUp(data: any): ComponentRef<OlPopUp> {
    this.viewContainer.clear();

    let popUpComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      OlPopUp
    );
    let popUpComponentRef = this.viewContainer.createComponent(
      popUpComponentFactory
    );

    let popUpInstance = popUpComponentRef.instance;

    popUpInstance.popContent = data.popContent;

    let mapPopUpElement = jQuery(".popup-anchor").next();

    mapPopUpElement.detach().prependTo(".ol-popup .ol-popup-content");
    // jQuery('.esriPopup .contentPane').height(mapPopUpElement.children(':eq(0)').height());

    return popUpComponentRef;
  }

  createXciePopUp(data: any): ComponentRef<any> {
    this.viewContainer.clear();

    let popUpComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      XciePopUp
    );
    let popUpComponentRef = this.viewContainer.createComponent(
      popUpComponentFactory
    );

    let popUpInstance = popUpComponentRef.instance;

    popUpInstance.popContent = data.popContent;

    let mapPopUpElement = jQuery(".popup-anchor").next();

    mapPopUpElement.detach().prependTo(".ol-popup .ol-popup-content");

    return popUpComponentRef;
  }
}
