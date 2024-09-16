import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,ProgressSpinnerModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading = false;
  hasWrongCredentials = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }
  login(){
    this.loading = true
    this.authService.login(this.form.value).subscribe(
      response => {
        this.router.navigateByUrl('admin');
       },
      err => {
        console.log('er',err);
        this.loading = false;
        this.hasWrongCredentials = true;
      }
    )
  }

  goToRegister(){
    this.router.navigateByUrl('register');
  }

  goToForgotPassword(){
    this.router.navigateByUrl('forgot-password');
  }
}
