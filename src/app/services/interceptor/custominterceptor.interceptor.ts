import {HttpInterceptorFn} from '@angular/common/http'
import {Injectable} from '@angular/core'
Injectable()
export const custominterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'new-custom-token'
  const modifiedreq = req.clone({
    setHeaders: {
      'custom-type': 'Newitem',
      Token: `Bearer ${token}`,
    },
  })
  return next(modifiedreq)
}
