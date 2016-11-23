import { Component, OnInit } from '@angular/core';
import {Movie} from '../movie';
import {MoviesService} from '../movies.service';
import { IRating } from '../rating';
//noinspection TypeScriptCheckImport
import template from './movie-show-rating.component.html';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'show-rating',
  template: template,
  providers: [MoviesService]
})
export class MovieShowRatingComponent implements OnInit {
  movie: Movie;

  constructor(private _router: Router, private _route: ActivatedRoute, private _moviesService: MoviesService) {}

  ngOnInit() {
    this.fetchMovie();
  }

  private fetchMovie() {
    this._route.params.subscribe(
        (params:Params) => {
          let id = params['id'];
          this._moviesService.getMovieById(id)
              .subscribe(movie => this.movie = movie);
        }
    );
  }

  back() {
    this._router.navigate(['movies']);
  }

  formatUser(user:string) {
      let first:string = user.charAt(0);
      return first.toUpperCase() + user.substring(1);
  }

  deleteRating(rating:IRating) {
    this._moviesService.deleteRating(this.movie.id, rating)
    .subscribe(
      () => this.fetchMovie()
    );
  }
}
