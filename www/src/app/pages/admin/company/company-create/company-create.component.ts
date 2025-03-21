import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../../../services/company/company.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ProgressSpinnerModule,ToastModule],
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.css',
  providers: [MessageService]
})
export class CompanyCreateComponent {
loading = false;
  companyForm!: FormGroup;
constructor(
  private companyService: CompanyService,
  private router: Router,
  private messageService: MessageService
){

}

  ngOnInit(): void {
    this.initCompanyForm();
  }

  initCompanyForm(){
    this.companyForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
      }
    )
  }

  createCompany() {
    if (this.companyForm.invalid) {
      return; // Empêche l'envoi si le formulaire est invalide
    }

    this.loading = true;

    this.companyService.createCompany(this.companyForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/admin/company');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role mis à jour' });
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur dans la creation de la compagnie. Veuillez réessayer' });
        console.error('Erreur lors de la création du rôle :', err);
      },
      complete: () => {
        this.loading = false;
        console.log('Création terminée');
      }
    });
  }

}
