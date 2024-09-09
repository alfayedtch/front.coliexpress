import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { QrcodeService } from '../../../../services/qrcode/qrcode.service';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import {  QrcodeImageComponent } from '../images/qrcode-image/qrcode-image.component'
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,NgxQrcodeStylingModule,QrcodeImageComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  qrcodes:any = [];
  constructor(
    private qrcodeService: QrcodeService,
    private router:Router
  ){

  }

  ngOnInit(): void {
      this.getQrcodes();
  }
  public getQrcodes(){
    this.qrcodeService.getQrode().subscribe(
      response => {
        this.qrcodes = response;
      },
      err => {}
    )
  }

  goToEdit(qrcode:any){
    const navigationExtras: NavigationExtras = {
      state: {
        qrcode: qrcode
      }};
    this.router.navigate(['admin/qrcode/edit'], navigationExtras);
  }
}
