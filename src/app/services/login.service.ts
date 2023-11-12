import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email:string,password:string):any{
    const user = {email:email,password:password};
    return this.http.post('http://localhost:3001/api/user/login',user);
  }
}
