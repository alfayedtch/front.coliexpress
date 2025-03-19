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
import { AboutComponent } from './pages/custum/about/about.component';
import { ContactComponent } from './pages/custum/contact/contact.component';
import { ServiceComponent } from './pages/custum/service/service.component';

export const routes: Routes = [
  {
    path:'login',
    redirectTo:'custum/login'
  },
  {
    path:'register',
    redirectTo:'custum/register'
  },
  {
    path:'forgot-password',
    redirectTo:'custum/forgot-password'
  },

  //custum route
  {
    path:'custum',
    component: NavComponent,
    children:[
      //public route
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'service',
        component: ServiceComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },

      //Auth routes
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
        path: 'role',
        loadChildren: () => import('./pages/admin/role/role.routes').then(m => m.routes)
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/admin/user/user.routes').then(m => m.routes)
      },
      {
        path: 'privilege',
        loadChildren: () => import('./pages/admin/privilege/privilege.routes').then(m => m.routes)
      },
      {
        path: 'profile',
        component:ProfileComponent
      },
      {
        path:"**",
        redirectTo: "role"
      }
    ]
  },
  {
    path:"**",
    redirectTo: "/custum/home"
  }
];
