import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrivilegeService } from '../../../../services/privilege/privilege.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-privilege-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ProgressSpinnerModule],
  templateUrl: './privilege-create.component.html',
  styleUrl: './privilege-create.component.css'
})
export class PrivilegeCreateComponent {
loading = false;
  privilegeForm!: FormGroup;
constructor(
  private privilegeService: PrivilegeService,
  private router: Router
){

}

  ngOnInit(): void {
    this.initPrivilegeForm();
  }

  initPrivilegeForm(){
    this.privilegeForm = new FormGroup(
      {
        libelle: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
      }
    )
  }

  createPrivilege() {
    if (this.privilegeForm.invalid) {
      return; // Empêche l'envoi si le formulaire est invalide
    }

    this.loading = true;

    this.privilegeService.createPrivilege(this.privilegeForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/admin/privilege');
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de la création du rôle :', err);
      },
      complete: () => {
        this.loading = false;
        console.log('Création terminée');
      }
    });
  }

}
