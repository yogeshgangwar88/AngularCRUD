import {CommonModule, JsonPipe} from '@angular/common'
import {HttpClient} from '@angular/common/http'
import {Component} from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private srvc: HttpClient) {
    //
  }
  signupform = new FormGroup({
    fname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      this.CustomValidatorfn,
    ]),
    Email: new FormControl('', Validators.required),
    Number: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Address: new FormGroup({
      Aria: new FormControl('', Validators.minLength(5)),
      Pin: new FormControl('', Validators.minLength(3)),
    }),
  })

  onSubmit() {
    console.log(this.signupform)
    let obj = {
      name: this.signupform.controls.fname.value,
      email: this.signupform.controls.Email.value,
      number: this.signupform.controls.Number.value,
    }
    this.srvc.post('http://localhost:3000/usersb', obj).subscribe({
      next(value) {
        console.log('Observable emitted the next value: ' + value)
      },
      error(err) {
        console.error('Observable emitted an error: ' + err)
      },
      complete() {
        console.log('Observable emitted the complete notification')
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
      return {iserror: true}
    } else {
      return null
    }
  }
}
