import {Component, OnInit} from 'angular2/core';
import {Movie} from '../movie';
import { Router } from 'angular2/router';
import {RouteParams} from 'angular2/router';
import {MoviesService} from '../movies.service';
import { IRating } from '../rating';

@Component({
  selector: 'show-rating',
  templateUrl: 'app/movies/rating/movie-show-rating.component.html',
  providers: [MoviesService]
})
export class MovieShowRatingComponent implements OnInit {
  movie: Movie;

  constructor(private _router: Router, private _routeParams:RouteParams, private _moviesService: MoviesService) {}

  ngOnInit() {
    this.fetchMovie();
  }

  private fetchMovie() {
    let id = +this._routeParams.get('id');
    this._moviesService.getMovieById(id)
      .subscribe(movie => this.movie = movie);
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
