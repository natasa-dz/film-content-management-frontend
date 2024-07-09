import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environment";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  subscribe(userId: string, subscriptionType: string, subscriptionValue: string): Observable<any> {
    const headers = this.getHeaders();
    const body = {
      user_id: userId,
      subscription_type: subscriptionType,
      subscription_value: subscriptionValue
    };

    return this.http.post(`${this.apiUrl}/subscriptions`, body, { headers });
  }

  unsubscribe(userId: string, subscriptionType: string, subscriptionValue: string): Observable<any> {
    const headers = this.getHeaders();
    const options = {
      headers,
      body: {
        user_id: userId,
        subscription_type: subscriptionType,
        subscription_value: subscriptionValue
      }
    };

    return this.http.delete(`${this.apiUrl}/subscriptions`, options);
  }

  getSubscriptions(userId: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(`${this.apiUrl}/subscriptions`, {
      headers,
      params: { user_id: userId }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}
