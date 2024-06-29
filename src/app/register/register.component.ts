import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegistrationComponent {
  user = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    username: '',
    email: '',
    password: '',
    role: 'User'
  };

  // private userService: UserService ---> parametar konstruktora
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log("User before registration: ", this.user)
    this.authService.register(this.user).subscribe(
      response => {
        alert('Registration successful!');
        // this.router.navigate(['/confirm'], { queryParams: { username: this.user.username } });

      },
      error => {
        console.error('Error during registration:', error);
        alert('Error during registration: ' + error.error.error);
      }
    );
  }
}
