import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,ProgressSpinnerModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  loading = false;
  emailSent:boolean|null = null;

  form: FormGroup = new FormGroup({
      email: new FormControl(''),
    });
  constructor(
    private router: Router,
    private authService: AuthService  ){

  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }
  submitForgotPassword(){
      this.loading =  true;
      this.authService.submitForgotPassword(this.form.value).subscribe(
        () => {
          this.emailSent = true;
          //this.router.navigateByUrl('login');
         },
        err => {
          this.emailSent=false
          this.loading = false;
         }
      )
  }
}
