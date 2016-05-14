import {Component, OnInit} from 'angular2/core';
import {Movie} from '../movie';
import { Router } from 'angular2/router';
import {RouteParams} from 'angular2/router';
import {MoviesService} from '../movies.service';
import { IRating } from '../rating';
import template from './movie-show-rating.component.html!text';

@Component({
  selector: 'show-rating',
  template: template,
  providers: [MoviesService]
})
export class MovieShowRatingComponent {
  movie: Movie;

  constructor(private _router: Router, private _routeParams:RouteParams, private _moviesService: MoviesService) {}

  private fetchMovie() {
    
  }

  back() {
    this._router.navigate(['Movies']);
  }

  deleteRating(rating:IRating) {
    this._moviesService.deleteRating(this.movie.id, rating)
    .subscribe(
      () => this.fetchMovie()
    );
  }
}
