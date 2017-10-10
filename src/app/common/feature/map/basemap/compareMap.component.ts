import { Component, ElementRef, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "compare-map",
  templateUrl: "./compareMap.component.html",
  styleUrls: ["./CompareMap.component.scss"]
})
export class CompareMap {
  mapId1 = "left-map";
  mapId2 = "right-map";

  constructor() {}

  ngOnInit() {
    let halfWidth = parseInt(jQuery(".compare-map-layer").css("width")) / 2;
    jQuery("#moveableNode").css("left", halfWidth);
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    // this.mapService.destroyDoubleMap();
  }

  backSingleMap() {
    postal.channel("MAPVIEW_CHANNEL").publish("map.create");
  }
}
