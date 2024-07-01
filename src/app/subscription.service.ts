import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  subscribe(userId: string, subscriptionType: string, subscriptionValue: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscriptions`, {
      user_id: userId,
      subscription_type: subscriptionType,
      subscription_value: subscriptionValue
    });
  }
  unsubscribe(userId: string, subscriptionType: string, subscriptionValue: string): Observable<any> {
    const body = {
      user_id: userId,
      subscription_type: subscriptionType,
      subscription_value: subscriptionValue
    };
    return this.http.delete(`${this.apiUrl}/subscriptions`, { body });
  }

  getSubscriptions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/subscriptions`, {
      params: { user_id: userId }
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}
