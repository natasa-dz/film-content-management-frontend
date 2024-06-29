import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  getUserRole(username: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/fetch-role?username=${username}`);
  }

  confirmSignUp(username: string, code: string): Observable<any> {
    const url = `${this.apiUrl}/confirm`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, code };

    return this.http.post(url, body, { headers });
  }
}
