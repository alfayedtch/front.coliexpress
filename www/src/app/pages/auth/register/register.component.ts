import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,ProgressSpinnerModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  isConnected = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    birthdate: new FormControl(''),
    confirmPassword: new FormControl(''),
    password: new FormControl('')
  });


  constructor(
    private router: Router,
    private authService: AuthService
  ){

  }

  register(){
    this.loading =  true;
    this.authService.register(this.form.value).subscribe(
      () => {
        this.router.navigateByUrl('login');
       },
      err => {
        this.loading = false;
        this.isConnected = true;
       }
    )
  }

  goToLogin(){
    this.router.navigateByUrl('login');
  }

  gotoForgotPassword(){
    this.router.navigateByUrl('forgot-password');
  }

}
