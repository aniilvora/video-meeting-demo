import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:7107/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':  'http://localhost:7107', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'Login/login', {
      email,
      password
    }, httpOptions);
  }

  register(userName: string, email: string, password: string, mobileNo:number): Observable<any> {
    return this.http.post(AUTH_API + 'Registration/registeruser', {
      userName,
      email,
      password,
      mobileNo
    }, httpOptions);
  }
}
