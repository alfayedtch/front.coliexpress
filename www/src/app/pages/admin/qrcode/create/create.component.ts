import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QrcodeService } from '../../../../services/qrcode/qrcode.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    data: new FormControl('')
  });


  constructor(
    private router: Router,
    private qrcodeService: QrcodeService
  ){

  }

  createQrcode(){
    console.log(this.form.value);
    this.qrcodeService.createQrcode(this.form.value).subscribe(
      response => { this.router.navigateByUrl('/admin/qrcode')},
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
