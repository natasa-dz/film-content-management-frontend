import { Component } from '@angular/core';
import {FilmService} from "../film.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchCriteria = {
    title: '',
    description: '',
    actors: '',
    director: '',
    genre: ''
  };
  searchResults: any[] = [];

  constructor(private filmService: FilmService) {}

  onSearch() {
    this.filmService.searchFilms(this.searchCriteria).subscribe(
      response => {
        this.searchResults = response;
      },
      error => {
        console.error(error);
        alert('Error searching for films.');
      }
    );
  }
}
