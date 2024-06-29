import { Component } from '@angular/core';
import {ReviewService} from "../reviews.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './submit-review.component.html',
  styleUrl: './submit-review.component.css'
})
export class SubmitReviewComponent {

  filmId: string | null = '';
  username: string = '';
  rating: number = 1;
  comment: string = '';
  ratingType: string = 'numeric'; // 'numeric', 'like', 'thumbsup'

  constructor(private reviewService: ReviewService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.filmId = this.route.snapshot.paramMap.get('film_id');
    this.route.queryParams.subscribe(params => {
      console.log(params['username'])
      this.username = params['username'];
    });
  }

  submitReview(): void {
    console.log("FILM ID: ", this.filmId)
    console.log("USERNAME: ", this.username)
    this.reviewService.submitReview(this.filmId, this.username, this.rating, this.comment, this.ratingType)
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
