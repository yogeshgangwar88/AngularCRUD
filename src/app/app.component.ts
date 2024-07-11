import {
  Component,
  DoCheck,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core'
import {RouterLink, RouterOutlet} from '@angular/router'
import {SigninComponent} from './Login/signin/signin.component'
import {LoginserviceService} from './services/loginservice.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnChanges {
  constructor(private myService: LoginserviceService) {
    //myService=inject(LoginserviceService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchn call', changes)
    //this.activatedusr= this.myService.Isloggedin();
  }

  getlogin() {
    return this.myService.Isloggedin()
  }
  title = 'AngularCRUD'
}
