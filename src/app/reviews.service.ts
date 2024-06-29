import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitReview(filmId: string, userId: string, rating: number, comment: string, ratingType: string): Observable<any> {
    const payload = { userId, rating, comment, ratingType };
    return this.http.post(`${this.apiUrl}/films/${filmId}/reviews`, payload);
  }

  getReviews(filmId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/${filmId}/reviews`);
  }

  getUserReviews(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/reviews`);
  }
}