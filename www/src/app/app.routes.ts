import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SideComponent } from './pages/layout/side/side.component';
import { HomeComponent } from './pages/custum/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ListComponent } from './pages/admin/qrcode/list/list.component';
import { CreateComponent } from './pages/admin/qrcode/create/create.component';
import { EditComponent } from './pages/admin/qrcode/edit/edit.component';
import { authGuard } from './guards/auth/auth.guard';
import { connectedGuard } from './guards/auth/connected.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { NavComponent } from './pages/layout/nav/nav.component';

export const routes: Routes = [
  {
    path:'login',
    canActivate: [connectedGuard],
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },

  //custum route
  {
    path:'custum',
    component: NavComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path:"**",
        redirectTo: "home"
      }
    ]
  },

  //admin route
  {
    path:'admin',
    canActivate: [authGuard],
    component: SideComponent,
    children:[
      {
        path: 'qrcode',
        component:ListComponent,
      },
      {
        path: 'qrcode/create',
        component:CreateComponent
      },
      {
        path: 'qrcode/edit',
        component:EditComponent
      },

      {
        path: 'profile',
        component:ProfileComponent
      },
      {
        path:"**",
        redirectTo: "qrcode"
      }
    ]
  },
  {
    path:"**",
    redirectTo: "/custum/home"
  }
];
