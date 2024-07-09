import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { User, Userlogin } from '../../Model/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit,OnChanges {
user:Userlogin ={
  username:'',
  password:''
}
logindata:any;
constructor (private myService: LoginserviceService,private router:Router,private toastr: ToastrService){

}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    localStorage.removeItem('Islogin');
    this.user.username='emilys';
    this.user.password='emilyspass';
  }
loginuser(frm:User){
console.log(frm);
  this.myService.userlogin(this.user).subscribe((res)=>{
    if (res.hasOwnProperty('token')){
      localStorage.setItem('Islogin','true');
      if(this.myService.Isloggedin())
        this.router.navigate(['/home'])
    }
    else
     this.toastr.error('Invalid cred','wrong input');
  });
 

//alert('Invalid cred');
}
}
