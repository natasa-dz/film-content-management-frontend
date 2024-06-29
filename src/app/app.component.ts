import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  constructor(private userService: UserService, private authService:AuthService) {}

  ngOnInit(): void {
  }
}

