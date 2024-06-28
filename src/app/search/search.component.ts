import {ChangeDetectorRef, Component} from '@angular/core';
import {FilmService} from "../film.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule, // Make sure CommonModule is imported
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

  constructor(private filmService: FilmService, private cdr: ChangeDetectorRef) {}

  onSearch() {
    this.filmService.searchFilms(this.searchCriteria).subscribe(
      response => {
        this.searchResults = response;
        console.log(this.searchResults)
        this.cdr.detectChanges(); // Manually trigger change detection

      },
      error => {
        console.error(error);
        alert('Error searching for films.');
      }
    );
  }
}
