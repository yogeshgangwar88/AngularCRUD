import {Routes} from '@angular/router'

import {UserhomeComponent} from './Users/userhome/userhome.component'
import {authGuard} from './gaurd/auth.guard'
import {ItemdetailComponent} from './itemdetail/itemdetail/itemdetail.component'

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  ////lazy loading
  {
    path: 'login',
    loadComponent: () =>
      import('./Login/signin/signin.component').then((m) => m.SigninComponent),
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./Login/signup/signup.component').then((m) => m.SignupComponent),
  },
  /// normal loading component with gaurd
  {path: 'home', component: UserhomeComponent, canActivate: [authGuard]},
  {
    path: 'home/itemdetails/:id',
    component: ItemdetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/mattable',
    loadComponent: () =>
      import('./Users/mattable/mattable.component').then(
        (m) => m.MattableComponent
      ),
    canActivate: [authGuard],
  },
  {path: '**', redirectTo: '/'},
]
