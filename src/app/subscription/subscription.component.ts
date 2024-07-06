import { Component } from '@angular/core';
import {SubscriptionService} from "../subscription.service";
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {FeedService} from "../feed.service";

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

  constructor(private subscriptionService: SubscriptionService, private userService:UserService, private feedService:FeedService) {}

  onSubscribe() {
    console.log(this.userService.getUsername())

    this.subscriptionService.subscribe(this.userService.getUsername()!,this.subscription.type, this.subscription.value).subscribe(
      response => {
        console.log('Subscription successful:', response);
        alert('Subscribed successfully');
        this.generateFeed();

      },
      error => {
        console.log(this.subscription)
        console.error('Error during subscription:', error);
        alert('Error during subscription: ' + error.error.error);
      }
    );
  }

  private generateFeed(){
    //added feed generation after significant changes that could impact the ranking
    this.feedService.generateFeed(this.userService.getUsername()!).subscribe(feed=>
      {
        console.log("Feed generated successfully!")
      }, error => {
        console.error('Error generating feed:', error);
      }
    )
  }
}
