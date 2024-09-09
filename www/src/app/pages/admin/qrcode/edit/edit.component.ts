import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeStylingModule, Options } from 'ngx-qrcode-styling';
import { QrcodeService } from '../../../../services/qrcode/qrcode.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NgxQrcodeStylingModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit,OnDestroy {
  qrcode:any = null;
  config!: Options;
  form!: FormGroup ;

  constructor(
    private router: Router,
    private qrcodeService:QrcodeService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    console.log(state);
    this.qrcode = (state)?state['qrcode']:null;
    if(this.qrcode === null){
      this.router.navigateByUrl('/admin/qrcode');
    }
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
   this.config = {
      width: 300,
      height: 300,
      data: this.qrcode.qrcode_access,
      image: this.qrcode.logo_image,
      margin: 5,
      dotsOptions: {
        color: "#000000",
        type: "dots"
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0
      }
    };

    this.form = new FormGroup({
      name: new FormControl(this.qrcode.name),
      data: new FormControl(this.qrcode.data),
      logo_image: new FormControl(this.qrcode.logo_image),
      qrcode_key: new FormControl(this.qrcode.qrcode_key)
    });
  }


  updateQrcode(){
    console.log(this.form.value);
    this.qrcodeService.updateQrcode(this.form.value).subscribe(
      response => { this.router.navigateByUrl('/admin/qrcode')},
      err => { }
    )
  }


}
