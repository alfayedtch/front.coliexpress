import { Routes } from "@angular/router";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserListComponent } from "./user-list/user-list.component";

export const routes: Routes =[
  {
    path:'create',
    component: UserCreateComponent
  },
  {
    path:'list',
    component: UserListComponent
  },
  {
    path:'**',
    redirectTo:'list'
  }
]
