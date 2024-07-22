import { CommonModule, JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  baseurl: string = 'http://localhost:5123/api/User'
  constructor(
    private srvc: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    //
  }
  signupform = new FormGroup({
    fname: new FormControl('', [this.CustomValidatorfn]),
    Email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Number: new FormControl(''),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    Address: new FormGroup({
      Aria: new FormControl(''),
      Pin: new FormControl(''),
    }),
  })

  onSubmit() {
    console.log(this.signupform)
    let obj = {
      email: this.signupform.controls.Email.value,
      password: this.signupform.controls.Password.value,
    }
    this.srvc.post(this.baseurl + '/Adduser', obj).subscribe({
      next: (value) => {
        this.toastr.success('User Added')
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err)
        this.toastr.error('something went wrong')
      },
      complete() {
        // console.log('Observable emitted the complete notification')
      },
    })
  }

  CustomValidatorfn(control: AbstractControl) {
    const words = ['bc', 'mc', 'kutta', 'kamina']
    let list = (control.value as string).split(' ')
    let iserror = false
    for (let i of list) {
      if (words.includes(i)) {
        iserror = true
      }
    }
    if (iserror) {
      return { iserror: true }
    } else {
      return null
    }
  }
}
