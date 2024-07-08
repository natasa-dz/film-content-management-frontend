import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
      actors:film.actors,
      year: film.year,
      genre: film.genre,
      description: film.description,
      file: base64File
    };

    console.log("Form data being sent:", body);  // Log form data for debugging

    return this.http.post<{message: string, executionArn: string }>(`${this.apiUrl}/films`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }



  getMetadata(filmId?: string): Observable<any> {
    const url = filmId ? `${this.apiUrl}/films/${filmId}` : `${this.apiUrl}/films`;
    return this.http.get(url);
  }

  downloadFilm(filmId: string, userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/download`, {
      params: {
        film_id: filmId,
        user_id: userId
      }
    });
  }


  getFilms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films`);
  }

  getFilmById(film_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films?film_id=${film_id}`);
  }

  // delete option
  deleteFilmById(filmId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/films/${filmId}`);
  }

  // TODO: TEST search option
  searchFilms(criteria: any): Observable<any> {
    console.log("Search criteria: ", criteria)
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
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });

}

  updateFilm(film: any, base64File?: string): Observable<any> {

    const body = {
      film_id: film.film_id,
      title: film.title,
      director: film.director,
      year: film.year,
      genre: film.genre,
      description: film.description,
      ...(base64File && { file: base64File }) // Only include file if provided
    };

    console.log("Request body: ", body)

    return this.http.put(`${this.apiUrl}/films/${film.film_id}`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
