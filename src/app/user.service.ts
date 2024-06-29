import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string | null = null;
  private role: string | null = null;


  constructor() { }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  getRole(): string | null {
    return this.role;
  }

  setRole(role: string) {
    this.role = role;
  }
}
