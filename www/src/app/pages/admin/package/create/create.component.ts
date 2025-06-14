import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageService } from '../../../../services/package/package.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form: FormGroup = new FormGroup({
    receiver_email: new FormControl(''),
    sender_email: new FormControl(''),
    weight: new FormControl(''),
  });


  constructor(
    private router: Router,
    private packageService: PackageService
  ){

  }

  createPackage(){
    console.log(this.form.value);
    this.packageService.createPackage(this.form.value).subscribe(
      response => { this.router.navigateByUrl('/admin/package')},
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
