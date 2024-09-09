import { Component, Input, OnInit } from '@angular/core';
import { NgxQrcodeStylingModule, Options } from 'ngx-qrcode-styling';

@Component({
  selector: 'app-qrcode-image',
  standalone: true,
  imports: [NgxQrcodeStylingModule],
  templateUrl: './qrcode-image.component.html',
  styleUrl: './qrcode-image.component.css'
})
export class QrcodeImageComponent implements OnInit {

  @Input() qrcodeImage:string = '';
  @Input() qrcodeData:string = '';

  public config!: Options

  ngOnInit(): void {
    this.config = {
      width: 100,
      height: 100,
      data: this.qrcodeData,
      image: this.qrcodeImage,
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
  }
}
