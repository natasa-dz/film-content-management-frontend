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
  actorsString = ''  // Temporary string to hold actors input

  selectedFile: File | null = null;

  constructor(private filmService: FilmService) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onUpload() {
    if (this.selectedFile) {
      this.film.film_id = this.generateFilmId();

      try {
        const fileBase64 = await this.convertFileToBase64(this.selectedFile);

        this.film.actors = this.actorsString.split(',').map(actor => actor.trim());

        this.filmService.uploadFilm(this.film, fileBase64).subscribe(
          response => {
            alert('Film uploaded successfully!');
            alert(response)
          },
          error => {
            console.error(error);
            alert('Error uploading film.');
          }
        );
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

  private transcodeFilm(filmId: string, fileName: string) {
    const resolutions = ['720p', '1080p', '360p'];  // Define your desired resolutions

    const event = {
      film_id:this.film.film_id,
      resolutions: resolutions
    };

    console.log("EVENT KOJI SE SALJE: ", event)

    this.filmService.transcodeFilm(event).subscribe(
      response => {
        console.log('Transcoding process initiated.');
      },
      error => {
        console.error('Error initiating transcoding process.');
      }
    );
  }

}
