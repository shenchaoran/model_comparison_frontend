import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { startWith, take, map } from 'rxjs/operators';
import { NguCarouselConfig } from '@ngu/carousel';
import { slider } from './cascader-slide.animation';

@Component({
    selector: 'ogms-home-banner',
    templateUrl: './home-banner.component.html',
    styleUrls: ['./home-banner.component.scss'],
    animations: [slider],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBannerComponent{
    public carouselTileItems = [
        {
            h1: 'Run all kinds of model online',
            desc: 'Promote the development of opening geo-modeling and simulation theory and technology'
        }, 
        {
            h1: 'Provide your own Topic',
            desc: 'Improving our knowledge and understanding of global and regional climate variability and change'
        }, 
        {
            h1: 'Create solution to compare topic',
            desc: 'Comprehensive comparison of simulation capabilities from multiple perspectives'
        },
        {
            h1: 'Config and Compute the task user-defined',
            desc: 'Improve reusability of participating comparative models'
        }
    ];
    public carouselTileConfig: NguCarouselConfig = {
        grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
        speed: 250,
        load:1,
        point: {
            visible: false,
            hideOnSingleSlide: true,
        },
        touch: true,
        loop: true,
        interval: { timing: 3000 },
        animation: 'lazy'
    };
}
