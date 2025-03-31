import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../../services/company/company.service';
import { Company } from '../../../../../interfaces/company';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { RoleConcatPipe } from '../../../../../pipe/roleConcat/role-concat.pipe';
import { MessageService } from 'primeng/api';
import { User } from '../../../../../interfaces/user';

@Component({
  selector: 'app-company-client-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ToastModule, RoleConcatPipe],
  templateUrl: './company-client-list.component.html',
  styleUrl: './company-client-list.component.css',
  providers: [MessageService]
})
export class CompanyClientListComponent implements OnInit {

  selectedUsers =[];
  clients:User[] =[];
  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  )
  {

  }


  ngOnInit(): void {
    this.initClient();
  }

  initClient(){
    const key = this.activatedRoute.snapshot.params['key'];
    this.companyService.getCompanyClients(key).subscribe(
      (response:any) => {
        this.clients = response.clients
      },
      (err:any) => {},
    )
  }


}
