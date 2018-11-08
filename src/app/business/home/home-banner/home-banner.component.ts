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
            desc: 'I am the detail information the detail information the detail information the detail information'
        }, 
        {
            h1: 'Provide your own Topic',
            desc: 'I am the detail information the detail information the detail information the detail information'
        }, 
        {
            h1: 'Create solution to compare topic',
            desc: 'I am the detail information the detail information the detail information the detail information'
        },
        {
            h1: 'Config and Compute the task user-defined',
            desc: 'I am the detail information the detail information the detail information the detail information'
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
        interval: { timing: 1500 },
        animation: 'lazy'
    };
}
