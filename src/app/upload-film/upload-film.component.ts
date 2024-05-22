import { Component } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-upload-film',
  templateUrl: './upload-film.component.html',
  styleUrl: './upload-film.component.css'
})
export class UploadFilmComponent {
  filmTitle='';
  filmDescription='';
  selectedFile: File | null = null;

  constructor(private filmService: FilmService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.filmService.uploadFilm(this.selectedFile).subscribe(
        response => {
          alert('File uploaded successfully!');
        },
        error => {
          console.error(error);
          alert('Error uploading file.');
        }
      );
    } else {
      alert('Please select a file first.');
    }
  }
}
