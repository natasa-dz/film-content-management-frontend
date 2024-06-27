import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  // private userService: UserService ---> parametar konstruktora
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Login successful:', response);
        alert('Login successful!');
      },
      error => {
        console.error('Error during login:', error);
        alert('Error during login: ' + error.error.error);
      }
    );
  }

}
