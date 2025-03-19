import {  Routes } from "@angular/router";
import { RoleCreateComponent } from "./role-create/role-create.component";
import { RoleListComponent } from "./role-list/role-list.component";

export const routes: Routes =[
  {
    path:'create',
    component: RoleCreateComponent
  },
  {
    path:'list',
    component: RoleListComponent
  },
  {
    path:'**',
    redirectTo:'list'
  },
]
