import { Component } from '@angular/core';
import { FilmService } from '../film.service';

interface Metadata {
  title?: string;
  description?: string;
  [key: string]: any; // Allow additional properties
}

@Component({
  selector: 'app-update-metadata',
  templateUrl: './update-metadata.component.html',
  styleUrls: ['./update-metadata.component.css']
})
export class UpdateMetadataComponent {
  filmId = '';
  metadata: Metadata = {};

  constructor(private filmService: FilmService) {}

  onUpdate() {
    if (this.filmId && Object.keys(this.metadata).length) {
      this.filmService.updateMetadata(this.filmId, this.metadata).subscribe(
        response => {
          alert('Metadata updated successfully!');
        },
        error => {
          console.error(error);
          alert('Error updating metadata.');
        }
      );
    } else {
      alert('Please provide film ID and metadata.');
    }
  }
}
