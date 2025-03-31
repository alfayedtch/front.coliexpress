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
import { Company } from '../../../../interfaces/company';
import { CompanyService } from '../../../../services/company/company.service';
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ToastModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
  providers: [MessageService]
})
export class CompanyListComponent implements OnInit {
  companies: Company[] =[];
  selectedCompanies: Company[] =[];
  statuses!: SelectItem[];
  allCompanies:Company[]=[];

  clonedCompanies: { [s: string]: Company } = {};

  constructor(
    private companyService: CompanyService,
    private messageService: MessageService,
    private router: Router
  ){

  }


  ngOnInit(): void {
    this.initCompanies();
  }

  initCompanies(){
    this.companyService.getCompanies().subscribe(
      (response:any) => {this.companies = <Company[]>response.companies}
    )
  }

  onRowEditInit(company: Company) {
    this.clonedCompanies[company.id as unknown as string] = { ...company };
}

onRowEditSave(company: Company) {
  if (company.key) {
    delete this.clonedCompanies[company.id as unknown as string];

    this.companyService.updateCompany(company).pipe(
      mergeMap(() => this.companyService.getCompanies()) // Enchaîne directement la récupération des rôles
    ).subscribe(
      (response: any) => {
        this.companies = <Company[]>response.companies;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company mis à jour' });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez réessayer' });
      }
    );
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la mise à jour. Veuillez réessayer' });
  }
}


onRowEditCancel(company: Company, index: number) {
    this.companies[index] = this.clonedCompanies[company.id as unknown as string];
    delete this.clonedCompanies[company.id as unknown as string];
}


onGettingClient(company: Company){
  this.router.navigateByUrl('admin/company/'+ company.key +'/client')
}

}
