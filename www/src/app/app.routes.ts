import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SideComponent } from './pages/layout/side/side.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ListComponent } from './pages/admin/qrcode/list/list.component';
import { CreateComponent } from './pages/admin/qrcode/create/create.component';
import { EditComponent } from './pages/admin/qrcode/edit/edit.component';

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
    path:'register',
    component: RegisterComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path:'admin',
    component: SideComponent,
    children:[
      {
        path: 'qrcode',
        component:ListComponent
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
        path:"**",
        redirectTo: "qrcode"
      }
    ]
  },
  {
    path:"**",
    redirectTo: "home"
  }
];
