import {Routes} from '@angular/router'
import {SigninComponent} from './Login/signin/signin.component'
import {SignupComponent} from './Login/signup/signup.component'
import {UserhomeComponent} from './Users/userhome/userhome.component'
import {authGuard} from './gaurd/auth.guard'
import {ItemdetailComponent} from './itemdetail/itemdetail/itemdetail.component'
import {MattableComponent} from './Users/mattable/mattable.component'

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  ////lazy loading
  {
    path: 'login',
    loadComponent: () =>
      import('./Login/signin/signin.component').then((m) => m.SigninComponent),
  },
  ////normal loading
  {path: 'signup', component: SignupComponent},
  ///component with gaurd
  {path: 'home', component: UserhomeComponent, canActivate: [authGuard]},
  {
    path: 'home/itemdetails/:id',
    component: ItemdetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/mattable',
    component: MattableComponent,
  },
  {path: '**', redirectTo: '/'},
]
