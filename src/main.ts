import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppModule } from 'app';
import { environment } from 'environments/environment';
import { hmrBootstrap } from 'hmr';
import 'zone.js/dist/zone';

const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(AppModule);
};

console.log(environment);
// console.log('is hot:', module.hot);

if (environment.hmr) {
    if (module.hot) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.info('Are you using the --hmr flag for ng serve?');
    }
} else {
    if(environment.production) {
        enableProdMode();
    }
    bootstrap();
}