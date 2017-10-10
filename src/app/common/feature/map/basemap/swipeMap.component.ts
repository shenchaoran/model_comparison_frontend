import {Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'swipe-map',
  templateUrl: './swipeMap.component.html',
  styleUrls: ['./swipeMap.component.scss']
})

export class SwipeMap {
    mapId1 = 'left-map';
    mapId2 = 'right-map';

    dragging = false;

    constructor() {
        
    }

    ngOnInit() {
        let halfWidth = parseInt(jQuery('#clip-map').css('width')) / 2;
        jQuery('#clip-map').css("clip", "rect(0px " + halfWidth + "px 100vh 0px)");
        jQuery('#moveableNode').css("left", halfWidth);

        jQuery('#moveableNode').mousedown(() => {
            this.dragging = true;
            
            jQuery(document).mousemove((e) => {
                if (this.dragging) {
                    let left = parseInt(jQuery('#moveableNode').css('left'));
                    let x = e.pageX;
                    let offsetX = jQuery('#moveableNode').offset().left;

                    let currentLeft = (left + x - offsetX);
                    currentLeft = currentLeft >= 0 ? currentLeft : 0;
                    jQuery('#moveableNode').css('left', currentLeft);

                    // jQuery(this.map2.nativeElement).css("clip", "rect(0px " + left + "px 100vh 0px)");
                    jQuery('#clip-map').css("clip", "rect(0px " + left + "px 100vh 0px)");
                }
            });

            jQuery(document).mouseup(() => {
                this.dragging = false;
            });
        });
    };

    ngAfterViewInit(){

    }

    ngOnDestroy(){
        
        //   this.mapService.destroyDoubleMap();
    }

    backSingleMap(){
        postal.channel("MAPVIEW_CHANNEL").publish("map.create");
    }

}
