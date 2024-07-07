import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFeed(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-feed`, {
      params: { user_id: username }
    });
  }

  generateFeed(username: string): Observable<any> {
    const params = new HttpParams().set('user_id', username);
    return this.http.post(`${this.apiUrl}/generate-feed`, {}, { params });
  }
}
