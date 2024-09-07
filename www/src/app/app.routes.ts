import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { SideComponent } from './layout/side/side.component';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'account',
    component: AccountComponent
  },
  {
    path:'side',
    component: SideComponent,
    children:[
      {
        path: 'login',
        component:LoginComponent
      }
    ]
  }
];
