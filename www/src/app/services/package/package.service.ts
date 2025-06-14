import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getQrode(){
      return this.httpClient.get(this.endpoint+'/package');
  }

  createPackage(form:any){
    return this.httpClient.post(this.endpoint+'/package',form);
  }

  updatePackage(form:any){
    return this.httpClient.put(this.endpoint+'/package',form);
  }

  track(number:string){
    const body = {
      tracking_number:number
    }
    return this.httpClient.post(this.endpoint+'/track',body);
}
}
