import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User, Userlogin } from '../Model/user';
import { Observable, Subscriber } from 'rxjs';
import { subscribe } from 'diagnostics_channel';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  Getdata: any;
  private Islogin = false;
  constructor() { }
  httpclnt = inject(HttpClient)
  Isloggedin() {
    if (localStorage.getItem('Islogin') == 'true')
      return true
    else
      return false;
  }
  userlogin(usrl: Userlogin) {
    return this.httpclnt.post('https://dummyjson.com/auth/login', usrl);
  }
  Getalluser(): Observable<User[]> {
    return this.httpclnt.get<User[]>('http://localhost:3000/users');
  }

}
