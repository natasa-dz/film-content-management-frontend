import { Component } from '@angular/core';
import {ReviewService} from "../reviews.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './submit-review.component.html',
  styleUrl: './submit-review.component.css'
})
export class SubmitReviewComponent {

  //TODO: NAMESTI DA SE FILM ID I USER ID PROSLEDJUJU!!!!
  filmId: string = '';
  userId: string = '';
  rating: number = 1;
  comment: string = '';
  ratingType: string = 'numeric'; // 'numeric', 'like', 'thumbsup'

  constructor(private reviewService: ReviewService) {}

  submitReview(): void {
    this.reviewService.submitReview(this.filmId, this.userId, this.rating, this.comment, this.ratingType)
      .subscribe(
        response => {
          console.log('Review submitted:', response);
        },
        error => {
          console.error('Failed to submit review:', error);
        }
      );
  }


}
