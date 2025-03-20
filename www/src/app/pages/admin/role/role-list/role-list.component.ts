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

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule,FormsModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
  providers: [MessageService]
})
export class RoleListComponent implements OnInit {
  roles: Role[] =[];
  selectedRoles: Role[] =[];
  statuses!: SelectItem[];

  clonedRoles: { [s: string]: Role } = {};

  constructor(
    private roleService: RoleService,
    private messageService: MessageService
  ){

  }


  ngOnInit(): void {
    this.initRoles();
  }

  initRoles(){
    this.roleService.getRoles().subscribe(
      (response:any) => {this.roles = <Role[]>response.roles}
    )
  }

  onRowEditInit(role: Role) {
    this.clonedRoles[role.id as unknown as string] = { ...role };
}

onRowEditSave(role: Role) {
    if (role.code) {
        delete this.clonedRoles[role.id as unknown as string];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role is updated' });
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}

onRowEditCancel(role: Role, index: number) {
    this.roles[index] = this.clonedRoles[role.id as unknown as string];
    delete this.clonedRoles[role.id as unknown as string];
}
}
