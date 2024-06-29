import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Login successful:', response);
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
        console.log("USER ROLE: ", role)
        if (role.toLowerCase()===('admin')) {
          console.log("USER JE ADMIN")
          // this.router.navigate(['/admin-main']);
        } else if (role.toLowerCase()===('user')) {
          console.log("USER JE GOST")
          // this.router.navigate(['/user-main']);
        } else {
          console.error('Unknown role:', role);
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
