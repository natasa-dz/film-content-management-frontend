import { Component } from '@angular/core';
import {FeedService} from "../feed.service";
import {UserService} from "../user.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  feed: any[] = [];
  constructor(private feedService: FeedService, private userService:UserService) { }

  ngOnInit(): void {
    this.fetchFeed();
  }

  fetchFeed(): void {
    this.feedService.getFeed(this.userService.getUsername()!).subscribe(
      data => {
        console.log(data)
        this.feed = data;
      },
      error => {
        console.error('Error fetching feed:', error);
      }
    );
  }
}
