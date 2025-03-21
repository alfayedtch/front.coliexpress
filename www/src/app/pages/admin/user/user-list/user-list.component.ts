import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Role } from '../../../../interfaces/role';
import { RoleService } from '../../../../services/role/role.service';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { mergeMap } from 'rxjs';
import { User } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user/user.service';
import { RoleConcatPipe } from "../../../../pipe/roleConcat/role-concat.pipe";
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ToastModule, RoleConcatPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService]

})
export class UserListComponent {
users: User[] =[];
  selectedUsers: User[] =[];
  statuses!: SelectItem[];
  allRoles:Role[]=[];

  clonedUsers: { [s: string]: User } = {};

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private messageService: MessageService
  ){

  }


  ngOnInit(): void {
    this.initUsers();
    this.initRoles();
  }

  initUsers(){
    this.userService.getUsers().subscribe(
      (response:any) => {this.users = <User[]>response.users}
    )
  }

  initRoles(){
    this.roleService.getRoles().subscribe(
      (response:any) => {this.allRoles = <Role[]>response.roles}
    )
  }

  onRowEditInit(user: User) {
    this.clonedUsers[user.id as unknown as string] = { ...user };
}

// onRowEditSave(user: User) {
//     if (user.code) {
//         delete this.clonedUsers[user.id as unknown as string];
//         this.userService.updateUser(user).subscribe(
//           (response:any)=>{
//             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User mis à jour' });

//           },
//           (err)=>{
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez rééssayer' });
//           },
//           ()=>{},
//         );
//         this.initUsers(); // Aretirer apres et utiliser un mergeMap
//     } else {
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez rééssayer' });
//     }
// }

onRowEditSave(user: User) {
  if (user.key) {
    delete this.clonedUsers[user.id as unknown as string];

    this.userService.updateUser(user).pipe(
      mergeMap(() => this.userService.getUsers()) // Enchaîne directement la récupération des rôles
    ).subscribe(
      (response: any) => {
        this.users = <User[]>response.users;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User mis à jour' });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez réessayer' });
      }
    );
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez réessayer' });
  }
}


onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.id as unknown as string];
    delete this.clonedUsers[user.id as unknown as string];
}

/** Vérifie si un rôle est sélectionné */
isRoleSelected(roleId: number | undefined, selectedRoles: any[]): boolean {
  return selectedRoles.some(p => p.id === roleId);
}

/** Ajoute ou retire un rôle */
toggleRole(roleId: number | undefined, selectedRoles: any[]): void {
  const index = selectedRoles.findIndex(p => p.id === roleId);
  if (index > -1) {
    selectedRoles.splice(index, 1); // ✅ Retirer
  } else {
    const role = this.allRoles.find(p => p.id === roleId);
    if (role) selectedRoles.push(role); // ✅ Ajouter
  }
}
}
