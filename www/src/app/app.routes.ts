import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SideComponent } from './pages/layout/side/side.component';
import { HomeComponent } from './pages/custum/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth/auth.guard';
import { connectedGuard } from './guards/auth/connected.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { NavComponent } from './pages/layout/nav/nav.component';
import { AboutComponent } from './pages/custum/about/about.component';
import { ContactComponent } from './pages/custum/contact/contact.component';
import { ServiceComponent } from './pages/custum/service/service.component';
import { ConfigurationComponent } from './pages/admin/configuration/configuration.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

export const routes: Routes = [
  // {
  //   path:'login',
  //   component:LoginComponent
  // },
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
    component:ForgotPasswordComponent
  },
  {
    path:'reset-password/:token',
    component:ResetPasswordComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  },
  {
    path:'custum/home/:tracking_number',
    component: HomeComponent
  },

  //custum route
  {
    path:'custum',
    component: NavComponent,
    children:[
      //public route
      {
        path:'home/:tracking_number',
        component: HomeComponent
      },
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
        path: 'company',
        loadChildren: () => import('./pages/admin/company/company.routes').then(m => m.routes)
      },
      {
        path: 'package',
        loadChildren: () => import('./pages/admin/package/package.routes').then(m => m.routes)
      },
      {
        path: 'profile',
        component:ProfileComponent
      },
      {
        path: 'configuration',
        component:ConfigurationComponent
      },
      {
        path:"**",
        redirectTo: "package"
      }
    ]
  },
  {
    path:"**",
    redirectTo: "/custum/home"
  }
];
