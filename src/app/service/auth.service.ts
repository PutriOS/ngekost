import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8888/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(firstname: string, lastname: string, email: string, password: string, key: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { firstname, lastname, email, password, key });
  }
  
}
