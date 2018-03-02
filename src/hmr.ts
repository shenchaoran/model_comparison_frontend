import {NgModuleRef, ApplicationRef} from '@angular/core';
import {createNewHosts} from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    bootstrap().then(mod => ngModule = mod);
    module.hot.dispose(() => {
        let appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        let elements = appRef.components.map(c => c.location.nativeElement);
        let makeVisible = createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
};

// if (module.hot) {
//     module.hot.accept();
//     module.hot.dispose(() => {
//         let _styles = document.head.querySelectorAll('style');
//         let styles = Array.prototype.slice.call(_styles);
//         styles
//             .filter((style: any) => style.innerText.indexOf('_ng') !== -1)
//             .map((el: any) => document.head.removeChild(el));
//     })
// }