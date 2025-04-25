import { provideHttpClient } from '@angular/common/http'
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    /* importProvidersFrom(
      ImagekitioAngularModule.forRoot({
        publicKey: environment.imageKitPublicKey,
        urlEndpoint: environment.imageKitUrlEndpoint,
      })
    ), */
  ],
};
