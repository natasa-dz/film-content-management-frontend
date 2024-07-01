import { Component } from '@angular/core';
import {SubscriptionService} from "../subscription.service";
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  subscription = {
    type: '',
    value: ''
  };

  constructor(private subscriptionService: SubscriptionService, private userService:UserService) {}

  onSubscribe() {
    console.log(this.userService.getUsername())

    this.subscriptionService.subscribe(this.userService.getUsername()!,this.subscription.type, this.subscription.value).subscribe(
      response => {
        console.log('Subscription successful:', response);
        alert('Subscribed successfully');
      },
      error => {
        console.log(this.subscription)
        console.error('Error during subscription:', error);
        alert('Error during subscription: ' + error.error.error);
      }
    );
  }
}
