import {ApplicationConfig} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideClientHydration} from '@angular/platform-browser'
import {provideHttpClient, withFetch} from '@angular/common/http'
import {provideToastr} from 'ngx-toastr'
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations(),
    provideAnimationsAsync(),
    BrowserAnimationsModule, provideAnimationsAsync(),
    // required animations providers
  ],
}
