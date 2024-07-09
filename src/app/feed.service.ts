import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFeed(username: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/get-feed`, { headers, params: { user_id: username } });
  }

  generateFeed(username: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('user_id', username);
    return this.http.post(`${this.apiUrl}/generate-feed`, {}, { headers,params });
  }
}
