import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private userService:UserService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.AuthenticationResult.AccessToken); // Čuvanje JWT tokena
        this.userService.setUsername(this.user.username); // Postavljanje korisničkog imena globalno
        this.getUserRoleAndRedirect(this.user.username);
      },
      error => {
        console.error('Error during login:', error);
        alert('Error during login: ' + error.error.error);
      }
    );
  }

  private getUserRoleAndRedirect(username: string) {
    this.authService.getUserRole(username).subscribe(
      (roleResponse:any)=> {
        const role=roleResponse.role
        if (role.toLowerCase()===('admin')) {
          this.router.navigate(['/admin-main']);
        } else if (role.toLowerCase()===('user')) {
          this.router.navigate(['/user-main']);
        } else {
          alert('Unknown role!');
        }
      },
      error => {
        console.error('Error fetching user role:', error);
        alert('Error fetching user role: ' + error.error.error);
      }
    );
  }
}
