import { Component } from '@angular/core';
import {FilmService} from "../film.service";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-get-metadata',
  templateUrl: './get-metadata.component.html',
  styleUrl: './get-metadata.component.css'
})
export class GetMetadataComponent {
  filmId = '';
  retrievedMetadata: any = null;

  constructor(private filmService: FilmService) {}

  onGet() {
    if (this.filmId) {
      this.filmService.getMetadata(this.filmId).subscribe(
        response => {
          this.retrievedMetadata = response;
        },
        error => {
          console.error(error);
          alert('Error retrieving metadata.');
        }
      );
    } else {
      alert('Please provide a film ID.');
    }
  }
}
