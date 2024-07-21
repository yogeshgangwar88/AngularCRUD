import { CommonModule, JsonPipe } from '@angular/common'
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterOutlet } from '@angular/router'
import { User, Userlogin } from '../../Model/user'
import { LoginserviceService } from '../../services/loginservice.service'
import { ToastrService } from 'ngx-toastr'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  user: Userlogin = {
    username: '',
    password: '',
  }
  logindata: any
  constructor(
    private myService: LoginserviceService,
    private router: Router,
    private toastr: ToastrService,
    private cookie: CookieService
  ) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('ngOnChanges');
  // }
  ngOnInit(): void {
    console.log('ngOnInit')
    //debugger
    this.cookie.deleteAll()
    this.user.username = 'test'
    this.user.password = '1234'
  }
  loginuser(frm: User) {
    let usr = {
      email: this.user.username,
      password: this.user.password,
    }
    this.myService.userlogin(usr).subscribe({
      next: (res: any) => {
        if (res.id != 0 && res.email != null) {
          this.cookie.set('Islogin', 'true')
          this.router.navigate(['/home'])
        } else this.toastr.error('Invalid cred', 'wrong input')
      },
      error: (err) => {
        this.toastr.error('Error', 'Something went wrong! Try Again')
        //console.log(err)
      },
      complete() {
        // console.log('Observable emitted the complete notification')
      },
    })
  }
}
