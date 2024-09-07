import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  private endpoint = environment.apuUrl +'/key'

  constructor(private _httpClient: HttpClient) { }

  getKeys(software_id:number){
    return this._httpClient.get(this.endpoint+'/'+software_id);
  }

  addKey(key:string,software_id:number){
    const body = {
      key:key,
      software_id:software_id
    };
    return this._httpClient.post<any>(this.endpoint,body);
  }
}
