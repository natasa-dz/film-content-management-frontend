import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,
  private jwtHelper: JwtHelperService) {}

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

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  // Funkcija za čuvanje JWT tokena u localStorage-u
  public saveToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  // Funkcija za dobijanje JWT tokena iz localStorage-a
  public getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  // Funkcija za brisanje JWT tokena iz localStorage-a
  public deleteToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getUserRoleFromToken(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      return of(''); // Return an empty observable if no token found
    }

    const decodedToken: any = this.jwtHelper.decodeToken(token);
    const username = decodedToken.username;

    return this.getUserRole(username).pipe(
      map((roleResponse: any) => roleResponse.role),
      catchError(error => {
        console.error('Error fetching user role:', error);
        return of(''); // Return an empty observable in case of error
      })
    );
  }
}
