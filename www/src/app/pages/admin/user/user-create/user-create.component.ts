import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RoleService } from '../../../../services/role/role.service';
import { CompanyService } from '../../../../services/company/company.service';
import { Role } from '../../../../interfaces/role';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ProgressSpinnerModule,ToastModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
  providers: [MessageService]

})
export class UserCreateComponent {
loading = false;
  userForm!: FormGroup;

  rolesList: any[] = []; // Liste des privilèges depuis l'API
  companiesList: any[] = []; // Liste des privilèges depuis l'API


constructor(
  private userService: UserService,
  private roleService: RoleService,
  private companyService: CompanyService,
  private router: Router,
  private messageService: MessageService

){

}

  ngOnInit(): void {
    this.initUserForm();
    this.loadcompanies();
  }

  initUserForm(){
    this.userForm = new FormGroup(
      {
        email: new FormControl((this.userForm?.controls['email'].value)?this.userForm.controls['email'].value:'', [Validators.required,Validators.email]),
        isAdmin: new FormControl((this.userForm?.controls['isAdmin'].value)?this.userForm.controls['isAdmin'].value:'', [Validators.required]),
        company_id: new FormControl((this.userForm?.controls['company_id'].value)?this.userForm.controls['company_id'].value:'', [Validators.required]),
      }
    )
  }


  initAdminUserForm(){
    this.userForm = new FormGroup(
      {
        email: new FormControl(this.userForm.controls['email'].value, [Validators.required,Validators.email]),
        isAdmin: new FormControl(this.userForm.controls['isAdmin'].value, [Validators.required]),
        company_id: new FormControl(this.userForm?.controls['company_id'].value, [Validators.required]),
        role_id: new FormControl('', [Validators.required]),
      }
    )
  }

  createUser() {
    if (this.userForm.invalid) {
      return; // Empêche l'envoi si le formulaire est invalide
    }

    this.loading = true;

    this.userService.createUser(this.userForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Utilisateur invité' });
        //this.router.navigateByUrl('/admin/user');
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur, il se peut que l\'utilisateur existe déja' });
        console.error('Erreur lors de la création du user :', err);
      },
      complete: () => {
        this.loading = false;
        console.log('Création terminée');
      }
    });
  }

  // Charger les roles depuis l'API
  loadRoles(event: Event) {
    const id: number = Number((event.target as HTMLSelectElement).value);

    this.roleService.getRoles().subscribe((response: any) => {
      this.rolesList = response.roles.filter((role: Role) => role.company_id === id);
    });
  }


  // Charger les compagnies depuis l'API
  loadcompanies() {
    this.companyService.getCompanies().subscribe((response:any) => {
      this.companiesList = response.companies;
    });
  }

}
