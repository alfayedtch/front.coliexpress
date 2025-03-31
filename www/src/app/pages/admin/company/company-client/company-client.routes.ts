import { Routes } from "@angular/router";
import { CompanyClientListComponent } from "./company-client-list/company-client-list.component";

export const routes: Routes =[
  {
    path:'list',
    component: CompanyClientListComponent
  },
  {
    path:'**',
    redirectTo:'list'
  },
]
