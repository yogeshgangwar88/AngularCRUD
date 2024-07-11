import {ApplicationConfig} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideClientHydration} from '@angular/platform-browser'
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import {provideToastr} from 'ngx-toastr'
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {custominterceptorInterceptor} from './services/interceptor/custominterceptor.interceptor'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations(),
    provideAnimationsAsync(),
    BrowserAnimationsModule,
    provideAnimationsAsync(),
    //custom interceptor added
    provideHttpClient(withInterceptors([custominterceptorInterceptor])),
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
  ],
}
