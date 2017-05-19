import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Office.initialize = (reason: any) => {
  console.log('MINICRM: initalizing office.js...');

  // bootstrap
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then((success: any) => {
      console.log('MINICRM: bootstrap success', success);
    })
    .catch((error: any) => {
      console.log('MINICRM: bootstrap error', error);
    });
};
