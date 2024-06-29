import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-get-metadata',
  templateUrl: './get-metadata.component.html',
  styleUrls: ['./get-metadata.component.css']
})
export class GetMetadataComponent implements OnInit {
  films: any[] = [];
  userRole: string | null = null; // Holds the user's role
  username?:string | null;

  constructor(private userService: UserService,private filmService: FilmService, private router:Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFilms();
    // this.fetchUserRole();
    this.username=this.userService.getUsername();
    console.log("USERNAME: ", this.username)
  }

  fetchUserRole() {
    // @ts-ignore
    this.authService.getUserRole(this.username).subscribe(
      (role: string) => {
        this.userRole = role; // Assuming role is a string ('admin' or 'user')
      },
      error => {
        console.error('Error fetching user role:', error);
        // Handle error
      }
    );
  }

  loadFilms(){
    this.filmService.getFilms().subscribe(data => {
      this.films = data;
    });
  }

  onDownload(filmId: string): void {
    this.filmService.downloadFilm(filmId).subscribe(
      data => {
        const fileBase64 = data.file;
        const fileBlob = this.base64ToBlob(fileBase64, 'application/octet-stream');
        const downloadUrl = window.URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${filmId}.mp4`; // Adjust the file extension as needed
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.error('Error fetching film:', error);
        alert('Error fetching film');
      }
    );
  }

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  onDelete(film_id: string){
    console.log("FILM ID: ", film_id.toString())
    this.filmService.deleteFilmById(film_id).subscribe(
      (response) => {
        if (response) {
          console.log('Film deleted successfully:', response);
          this.loadFilms()
        } else {
          console.error('Empty response received');
        }
      },
      (error) => {
        console.error('Error deleting film:', error);
      }
    );}

  onUpdate(film_id: any) {
    console.log("Usao u update")
    this.router.navigate(['/update', film_id]);
  }

  onReviewSubmit(film_id: any) {
    console.log("Username: ", this.username)
    const username=this.username
    this.router.navigate(['/submit-review', film_id], { queryParams: { username } });
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
