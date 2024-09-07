import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SoftwaresComponent } from './pages/admin/softwares/softwares.component';
import { AdminMenuComponent } from './pages/admin/admin-menu/admin-menu.component';
import { TranslationsComponent } from './pages/admin/translations/translations.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'admin',
        component:AdminMenuComponent,
        children:[
          {
            path:'softwares',
            component:SoftwaresComponent
          },
          {
            path:'softwares/:id',
            component:TranslationsComponent
          },{
            path:'',
            redirectTo:'softwares',
            pathMatch:'full'
          }
        ]
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'**',
        redirectTo:'home',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
