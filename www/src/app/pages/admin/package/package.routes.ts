import { createComponent } from "@angular/core";
import { Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";


export const routes: Routes =[
  {
    path:'create',
    component: CreateComponent
  },
  {
    path:'list',
    component: ListComponent
  },
  {
    path:'edit',
    component: EditComponent
  },
  {
    path:'**',
    redirectTo:'list'
  },
]
