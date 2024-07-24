import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, InjectionToken, inject } from '@angular/core'
import { User, Userlogin } from '../Model/user'
import { Observable, Subscriber } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  baseurl: string = 'http://localhost:8181/api/User'
  Getdata: any
  private Islogin = false
  constructor(private cookie: CookieService) {}
  httpclnt = inject(HttpClient)

  Isloggedin() {
    if (this.cookie.get('Islogin') == 'true') return true
    else return false
  }
  userlogin(usrl: any) {
    return this.httpclnt.post(this.baseurl + '/login', usrl)
  }
}
