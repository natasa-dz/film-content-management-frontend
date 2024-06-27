import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";

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
    password: ''
  };

  // private userService: UserService ---> parametar konstruktora
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful:', response);
        alert('Registration successful! Please check your email for verification.');
      },
      error => {
        console.error('Error during registration:', error);
        alert('Error during registration: ' + error.error.error);
      }
    );
  }
}
