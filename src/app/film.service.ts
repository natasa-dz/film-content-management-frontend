import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';

import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }
//, base64File: string
  uploadFilm(film: any, base64File:string): Observable<any> {

    const body = {
      film_id: film.film_id,
      title: film.title,
      director: film.director,
      year: film.year,
      genre: film.genre,
      description: film.description,
      file: base64File
    };

    console.log("Form data being sent:", body);  // Log form data for debugging

    return this.http.post(`${this.apiUrl}/films`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateMetadata(filmId: string, metadata: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/films/${filmId}`, { metadata });
  }

  getMetadata(filmId?: string): Observable<any> {
    const url = filmId ? `${this.apiUrl}/films/${filmId}` : `${this.apiUrl}/films`;
    return this.http.get(url);
  }

  downloadFilm(filmId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/download`, {
      params: { film_id: filmId }
    });
  }

  getFilms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films`);
  }

  getFilmById(film_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films?film_id=${film_id}`);
  }

}
