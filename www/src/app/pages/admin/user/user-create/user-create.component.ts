import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
constructor(
  private userService: UserService,
  private router: Router,
  private messageService: MessageService

){

}

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(){
    this.userForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required,Validators.email]),
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
        console.error('Erreur lors de la création du rôle :', err);
      },
      complete: () => {
        this.loading = false;
        console.log('Création terminée');
      }
    });
  }

}
