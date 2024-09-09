import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email ='';
  password ='';

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  login(){
    this.authService.login(this.email,this.password).subscribe(
      response => { },
      err => { }
    )
  }

  goToRegister(){
    this.router.navigateByUrl('register');
  }

  goToForgotPassword(){
    this.router.navigateByUrl('forgot-password');
  }
}
