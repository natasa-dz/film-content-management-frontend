import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFilm(film: any, base64File: string) {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const body = {
      film_id: film.film_id,
      title: film.title,
      director: film.director,
      actors: film.actors,
      year: film.year,
      genre: film.genre,
      description: film.description,
      file: base64File
    };

    console.log("Form data being sent:", body);


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/films`, body, { headers });
  }



  getMetadata(filmId?: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = filmId ? `${this.apiUrl}/films/${filmId}` : `${this.apiUrl}/films`;
    return this.http.get(url, { headers });
  }

  downloadFilm(filmId: string, userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/download`, {
      headers,
      params: {
        film_id: filmId,
        user_id: userId
      }
    });
  }

  transcodeFilm(event: {film_id:string, resolutions: string[] }) {
    return this.http.post(`${this.apiUrl}/films/transcode`, event, {
      headers: {
        'Content-Type': 'application/json'
      }});
  }




  getFilms(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/films`, { headers });
  }

  getFilmById(film_id: string): Observable<any> {
    console.log("pozove se");
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/films?film_id=${film_id}`, { headers });
  }

  deleteFilmById(filmId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/films/${filmId}`, { headers });
  }

  searchFilms(criteria: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams();
    if (criteria.title) {
      params = params.set('title', criteria.title);
    }
    if (criteria.description) {
      params = params.set('description', criteria.description);
    }
    if (criteria.actors) {
      params = params.set('actors', criteria.actors);
    }
    if (criteria.director) {
      params = params.set('director', criteria.director);
    }
    if (criteria.genre) {
      params = params.set('genre', criteria.genre);
    }

    return this.http.get<any[]>(`${this.apiUrl}/search`, { headers, params });
  }

  updateFilm(film: any, base64File?: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = {
      film_id: film.film_id,
      title: film.title,
      director: film.director,
      year: film.year,
      genre: film.genre,
      description: film.description,
      ...(base64File && { file: base64File })
    };

    console.log("Request body: ", body);

    return this.http.put(`${this.apiUrl}/films/${film.film_id}`, body, { headers });
  }
}
