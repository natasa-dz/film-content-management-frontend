import { Component } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-upload-film',
  templateUrl: './upload-film.component.html',
  styleUrls: ['./upload-film.component.css']
})
export class UploadFilmComponent {
  film = {
    film_id: '',
    title: '',
    director: '',
    year: '',
    genre: undefined,
    description: undefined,
    //TODO: ACTORS FIELD!!!
  };
  selectedFile: File | null = null;

  constructor(private filmService: FilmService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.filmService.uploadFilm(this.film, this.selectedFile).subscribe(
        response => {
          alert('Film uploaded successfully!');
        },
        error => {
          console.error(error);
          alert('Error uploading film.');
        }
      );
    } else {
      alert('Please select a file first.');
    }
  }
}
