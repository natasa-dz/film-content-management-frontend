import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-confirm-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './confirm-signup.component.html',
  styleUrl: './confirm-signup.component.css'
})
export class ConfirmSignupComponent {
  username: string = '';
  code: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the username from the query parameters
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  confirmSignUp(): void {
    this.authService.confirmSignUp(this.username, this.code).subscribe(
      response => {
        console.log('User confirmed successfully!', response);
        // Handle successful confirmation (e.g., redirect to login page)
      },
      error => {
        console.error('Error confirming user:', error);
        // Handle error (e.g., display error message)
      }
    );
  }
}
