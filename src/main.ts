import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// 手势操作库
import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';

// add by SCR
import 'zone.js/dist/zone';


// platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.log(err));

const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(AppModule);
};

// console.log(environment);
// console.log('is hot:', module.hot);

if (environment.hmr) {
    if (module.hot) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.info('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap();
}