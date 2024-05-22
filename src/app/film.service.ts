import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'API_BASE_URL';

  constructor(private http: HttpClient) {}

  uploadFilm(file: File): Observable<any> {
    const formData = new FormData();
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
