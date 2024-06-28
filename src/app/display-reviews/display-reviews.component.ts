import {Component, Input, OnInit} from '@angular/core';
import {ReviewService} from "../reviews.service";

@Component({
  selector: 'app-display-reviews',
  standalone: true,
  imports: [],
  templateUrl: './display-reviews.component.html',
  styleUrl: './display-reviews.component.css'
})
export class DisplayReviewsComponent implements OnInit {
  @Input() filmId: string = '';
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.filmId)
      .subscribe(
        (response: any) => {
          this.reviews = response;
        },
          (error: any) => {
          console.error('Failed to load reviews:', error);
        }
      );
  }
}
