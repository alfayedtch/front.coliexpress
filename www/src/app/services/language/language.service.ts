import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private endpoint = environment.apuUrl +'/language'

  constructor(private _httpClient: HttpClient) { }

  getLanguages():any{
    return this._httpClient.get<any>(this.endpoint);
  }

  addLanguage(name:string,code:string):any{
    const body = {
      name:name,
      code:code
    };
    return this._httpClient.post<any>(this.endpoint,body);

  }
}
