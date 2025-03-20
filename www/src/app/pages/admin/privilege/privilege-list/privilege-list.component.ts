import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PrivilegeConcatPipe } from '../../../../pipe/privilegeConcat/privilege-concat.pipe';
import { Privilege } from '../../../../interfaces/privilege';
import { PrivilegeService } from '../../../../services/privilege/privilege.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-privilege-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ToastModule, PrivilegeConcatPipe],
  templateUrl: './privilege-list.component.html',
  styleUrl: './privilege-list.component.css',
  providers: [MessageService]
})
export class PrivilegeListComponent implements OnInit {
  privileges: Privilege[] =[];
  selectedPrivileges: Privilege[] =[];
  statuses!: SelectItem[];
  allPrivileges:Privilege[]=[];

  clonedPrivileges: { [s: string]: Privilege } = {};

  constructor(
    private privilegeService: PrivilegeService,
    private messageService: MessageService
  ){

  }


  ngOnInit(): void {
    this.initPrivileges();
  }

  initPrivileges(){
    this.privilegeService.getPrivileges().subscribe(
      (response:any) => {this.privileges = <Privilege[]>response.privileges}
    )
  }

  onRowEditInit(privilege: Privilege) {
    this.clonedPrivileges[privilege.id as unknown as string] = { ...privilege };
}

onRowEditSave(privilege: Privilege) {
  if (privilege.code) {
    delete this.clonedPrivileges[privilege.id as unknown as string];

    this.privilegeService.updatePrivilege(privilege).pipe(
      mergeMap(() => this.privilegeService.getPrivileges()) // Enchaîne directement la récupération des rôles
    ).subscribe(
      (response: any) => {
        this.privileges = <Privilege[]>response.privileges;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Privilege mis à jour' });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez réessayer' });
      }
    );
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez réessayer' });
  }
}


onRowEditCancel(privilege: Privilege, index: number) {
    this.privileges[index] = this.clonedPrivileges[privilege.id as unknown as string];
    delete this.clonedPrivileges[privilege.id as unknown as string];
}

}
