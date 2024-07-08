import { Component } from '@angular/core';
import { FilmService } from '../film.service';
import { v4 as uuidv4 } from 'uuid';
import {catchError, concatMap, delay, filter, finalize, map, switchMap, take, takeWhile, tap} from 'rxjs/operators';
import {Observable, of, timer} from 'rxjs';


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
    genre: '',
    description: '',
    actors: [] as string[],
  };
  actorsString=''  // Temporary string to hold actors input

  selectedFile: File | null = null;

  constructor(private filmService: FilmService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onUpload() {
    if (this.selectedFile) {
      this.film.film_id = this.generateFilmId();

      try {
        const fileBase64 = await this.convertFileToBase64(this.selectedFile);

        this.film.actors = this.actorsString.split(',').map(actor => actor.trim());

        // Upload the film
        let uploadResponse;
        try {
          uploadResponse = await this.filmService.uploadFilm(this.film, fileBase64).toPromise();
          alert('Film uploaded successfully!');
          console.log("Film upload response: ", uploadResponse);
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          alert('Error during film upload.');
          return;
        }


      } catch (error) {
        console.error("Processing error:", error);
        alert('Error processing file.');
      }
    } else {
      alert('Please select a file first.');
    }
  }


  private generateFilmId(): string {
    return uuidv4();  // Generate a unique UUID
  }


  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }
}
