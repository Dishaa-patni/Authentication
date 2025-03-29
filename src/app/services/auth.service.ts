import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ApiURL="http://localhost:5000/api/auth"

  constructor(private http:HttpClient) { }

  register(userData:any):Observable<any>{
     return this.http.post(`${this.ApiURL}/register`,userData);
  }
  login(userData:any):Observable<any>{
    return this.http.post(`${this.ApiURL}/login`,userData);
 }
}
