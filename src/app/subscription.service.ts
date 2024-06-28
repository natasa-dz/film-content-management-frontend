import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'https://your-api-url.com';  // Replace with your API Gateway URL

  constructor(private http: HttpClient) { }

  subscribe(userId: string, subscriptionType: string, subscriptionValue: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe`, {
      user_id: userId,
      subscription_type: subscriptionType,
      subscription_value: subscriptionValue
    });
  }

  unsubscribe(userId: string, subscriptionType: string, subscriptionValue: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/unsubscribe`, {
      user_id: userId,
      subscription_type: subscriptionType,
      subscription_value: subscriptionValue
    });
  }

  getSubscriptions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/subscriptions`, {
      params: { user_id: userId }
    });
  }
}
