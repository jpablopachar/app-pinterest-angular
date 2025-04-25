import { provideHttpClient } from '@angular/common/http'
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore()
],
};
