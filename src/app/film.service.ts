import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {from, Observable} from 'rxjs';

import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = environment.apiUrl;

  private bucketName = 'YOUR_BUCKET_NAME';
  private region = 'YOUR_BUCKET_REGION';
  private accessKeyId = 'YOUR_ACCESS_KEY_ID';
  private secretAccessKey = 'YOUR_SECRET_ACCESS_KEY';

  constructor(private http: HttpClient) {

  }

  uploadFilm(film: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('film_id', film.film_id);
    formData.append('title', film.title);
    formData.append('director', film.director);
    formData.append('year', film.year.toString());
    formData.append('genre', film.genre);
    formData.append('description', film.description);
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/films`, formData);
  }

  updateMetadata(filmId: string, metadata: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/films/${filmId}`, { metadata });
  }

  getMetadata(filmId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/${filmId}`);
  }

}
