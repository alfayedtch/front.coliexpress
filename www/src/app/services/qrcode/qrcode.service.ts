import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getQrode(){
      return this.httpClient.get(this.endpoint+'/qrcode');
  }

  createQrcode(form:any){
    return this.httpClient.post(this.endpoint+'/qrcode/create',form);
  }

  updateQrcode(form:any){
    return this.httpClient.post(this.endpoint+'/qrcode/update',form);
  }
}
