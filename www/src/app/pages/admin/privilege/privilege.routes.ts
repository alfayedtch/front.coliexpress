import {  Routes } from "@angular/router";
import { PrivilegeCreateComponent } from "./privilege-create/privilege-create.component";
import { PrivilegeListComponent } from "./privilege-list/privilege-list.component";

export const routes: Routes =[
  {
    path:'create',
    component: PrivilegeCreateComponent
  },
  {
    path:'list',
    component: PrivilegeListComponent
  },
  {
    path:'**',
    redirectTo:'list'
  },
]
