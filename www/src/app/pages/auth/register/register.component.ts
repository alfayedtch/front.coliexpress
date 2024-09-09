import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email ='';
  password ='';
  firstname ='';
  lastname ='';
  confirmPassword ='';

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    confirmPassword: new FormControl(''),
    password: new FormControl('')
  });


  constructor(
    private router: Router,
    private authService: AuthService
  ){

  }

  register(){
    console.log(this.form.value);
    this.authService.register(this.form.value).subscribe(
      response => { },
      err => { }
    )
  }

  goToLogin(){
    this.router.navigateByUrl('login');
  }

  gotoForgotPassword(){
    this.router.navigateByUrl('forgot-password');
  }

}
