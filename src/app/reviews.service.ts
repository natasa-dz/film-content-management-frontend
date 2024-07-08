import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  submitReview(filmId: string | null, userId: string, rating: number, comment: string, ratingType: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const payload = {
      film_id: filmId,
      user_id: userId,
      rating,
      comment,
      rating_type: ratingType
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/films/${filmId}/reviews`, payload, { headers });
  }

  getReviews(filmId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/films/${filmId}/reviews`, { headers });
  }

  getUserReviews(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/users/${userId}/reviews`, { headers });
  }
}
