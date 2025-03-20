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
import { PrivilegeConcatPipe } from '../../../../pipe/privilegeConcat/privilege-concat.pipe';
import { Privilege } from '../../../../interfaces/privilege';
import { PrivilegeService } from '../../../../services/privilege/privilege.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ToastModule, PrivilegeConcatPipe],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
  providers: [MessageService]
})
export class RoleListComponent implements OnInit {
  roles: Role[] =[];
  selectedRoles: Role[] =[];
  statuses!: SelectItem[];
  allPrivileges:Privilege[]=[];

  clonedRoles: { [s: string]: Role } = {};

  constructor(
    private roleService: RoleService,
    private privilegeService: PrivilegeService,
    private messageService: MessageService
  ){

  }


  ngOnInit(): void {
    this.initRoles();
    this.initPrivileges();
  }

  initRoles(){
    this.roleService.getRoles().subscribe(
      (response:any) => {this.roles = <Role[]>response.roles}
    )
  }

  initPrivileges(){
    this.privilegeService.getPrivileges().subscribe(
      (response:any) => {this.allPrivileges = <Privilege[]>response.privileges}
    )
  }

  onRowEditInit(role: Role) {
    this.clonedRoles[role.id as unknown as string] = { ...role };
}

onRowEditSave(role: Role) {
    if (role.code) {
        delete this.clonedRoles[role.id as unknown as string];
        this.roleService.updateRole(role).subscribe(
          (response:any)=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role mis à jour' });

          },
          (err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez rééssayer' });
          },
          ()=>{},
        );
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez rééssayer' });
    }
}

onRowEditCancel(role: Role, index: number) {
    this.roles[index] = this.clonedRoles[role.id as unknown as string];
    delete this.clonedRoles[role.id as unknown as string];
}

/** Vérifie si un privilège est sélectionné */
isPrivilegeSelected(privilegeId: number | undefined, selectedPrivileges: any[]): boolean {
  return selectedPrivileges.some(p => p.id === privilegeId);
}

/** Ajoute ou retire un privilège */
togglePrivilege(privilegeId: number | undefined, selectedPrivileges: any[]): void {
  const index = selectedPrivileges.findIndex(p => p.id === privilegeId);
  if (index > -1) {
    selectedPrivileges.splice(index, 1); // ✅ Retirer
  } else {
    const privilege = this.allPrivileges.find(p => p.id === privilegeId);
    if (privilege) selectedPrivileges.push(privilege); // ✅ Ajouter
  }
  console.log(selectedPrivileges);
  console.log(this.roles);
  console.log(this.selectedRoles);
}
}
