import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-get-metadata',
  templateUrl: './get-metadata.component.html',
  styleUrls: ['./get-metadata.component.css']
})
export class GetMetadataComponent implements OnInit {
  films: any[] = [];
  userRole: Observable<string> | undefined; // Holds the user's role

  constructor(private userService: UserService,private filmService: FilmService, private router:Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFilms();
    this.userRole = this.authService.getUserRoleFromToken();
  }


  loadFilms(){
    this.filmService.getFilms().subscribe(data => {
      this.films = data;
    });
  }

  onDownload(filmId: string, resolution: string): void {

    let fileKey: string;

    switch (resolution) {
      case '360p':
        fileKey = `${filmId}_360p.mp4`;
        break;
      case '720p':
        fileKey = `${filmId}_720p.mp4`;
        break;
      case '1080p':
        fileKey = `${filmId}_1080p.mp4`;
        break;
      default:
        fileKey = `${filmId}.mp4`;
    }

    this.filmService.downloadFilm(fileKey, this.userService.getUsername()!).subscribe(
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
    console.log("Username: ", this.userService.getUsername()!)
    const username=this.userService.getUsername()!
    this.router.navigate(['/submit-review', film_id], { queryParams: { username } });
  }

  isAdmin() {
    // console.log(this.userRole)
    // // @ts-ignore
    // return this.userRole == 'admin'
    return true;
  }

  isUser() {
    // // @ts-ignore
    // return this.userRole == 'user'
    return true;
  }
}
