import { Routes } from "@angular/router";
import { CompanyCreateComponent } from "./company-create/company-create.component";
import { CompanyListComponent } from "./company-list/company-list.component";

export const routes: Routes =[
  {
    path:'create',
    component: CompanyCreateComponent
  },
  {
    path:'list',
    component: CompanyListComponent
  },
  {
    path:':key/client',
    loadChildren: () => import('./company-client/company-client.routes').then(m => m.routes)
  },
  {
    path:'**',
    redirectTo:'list'
  },
]
