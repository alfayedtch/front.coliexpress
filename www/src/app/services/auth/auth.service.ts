import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.endpoint;
  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password:string){
    const body ={
      email:email,
      password: password
    }
    return this.httpClient.post(this.endpoint+'/login',body);
  }

  register(register:any){
    return this.httpClient.post(this.endpoint+'/register',register);
  }
}
