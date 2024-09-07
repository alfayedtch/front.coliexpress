import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {
  private endpoint = environment.apuUrl +'/software'

  constructor(private _httpClient: HttpClient) { }

  getSoftwares():any{
    return this._httpClient.get<any>(this.endpoint);
  }

  addSoftware(name:string):any{
    const body = {
      name:name
    };
    return this._httpClient.post<any>(this.endpoint,body);

  }
}
