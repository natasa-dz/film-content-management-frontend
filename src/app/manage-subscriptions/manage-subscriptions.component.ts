import { Component } from '@angular/core';
import {SubscriptionService} from "../subscription.service";
import {UserService} from "../user.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-manage-subscriptions',
  standalone: true,
  imports: [
    CommonModule],
  templateUrl: './manage-subscriptions.component.html',
  styleUrl: './manage-subscriptions.component.css'
})
export class ManageSubscriptionsComponent {

  subscriptions:any[]=[];
  userId:string | null = null ;

  constructor(private subscriptionService: SubscriptionService, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.userService.getUsername();
    console.log("USER ID: ", this.userId)
    if (this.userId) {
      this.subscriptionService.getSubscriptions(this.userId).subscribe(
        (subscriptions) => {
          this.subscriptions = subscriptions;
        },
        (error) => {
          console.error('Error fetching subscriptions:', error);
        }
      );
    }
  }

  deleteSubscription(subscriptionType: string, subscriptionValue: string): void {
    if (this.userId) {
      this.subscriptionService.unsubscribe(this.userId, subscriptionType, subscriptionValue).subscribe(
        (response) => {
          this.subscriptions = this.subscriptions.filter(sub => !(sub.subscription_type === subscriptionType && sub.subscription_value === subscriptionValue));
          this.subscriptionService.openSnackBar('Subscription deleted successfully');

        },
        (error) => {
          console.error('Error deleting subscription:', error);
        }
      );
    }
  }

}
