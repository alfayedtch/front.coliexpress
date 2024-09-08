import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { SideComponent } from './layout/side/side.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
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
  },
  {
    path:"**",
    redirectTo: "home"
  }
];
