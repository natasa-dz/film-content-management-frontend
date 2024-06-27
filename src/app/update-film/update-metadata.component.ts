import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-metadata.component.html',
  styleUrls: ['./update-metadata.component.css']
})
export class UpdateMetadataComponent implements OnInit {
  film = {
    film_id: '',
    title: '',
    director: '',
    year: '',
    genre: '',
    description: '',
    actors: ''
  };
  selectedFile: File | null = null;
  film_id: string | undefined;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the film_id from the route parameters and load the film data
      this.film_id = this.route.snapshot.params['film_id'];
      if (this.film_id) {
        this.loadFilmData(this.film_id);
      }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onUpdate() {
    try {
      let fileBase64 = null;
      if (this.selectedFile) {
        fileBase64 = await this.convertFileToBase64(this.selectedFile);
      }

      // Update film data directly to the backend
      // @ts-ignore
      this.filmService.uploadFilm(this.film, fileBase64).subscribe(
        response => {
          alert('Film metadata updated successfully!');
          this.router.navigate(['/films']);  // Navigate to films list
        },
        error => {
          console.error(error);
          alert('Error updating film metadata.');
        }
      );
    } catch (error) {
      console.error(error);
      alert('Error processing file.');
    }
  }

  private loadFilmData(filmId: string) {
    this.filmService.getFilmById(filmId).subscribe(
      response => {
        this.film = response;
      },
      error => {
        console.error(error);
        alert('Error loading film data.');
      }
    );
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
