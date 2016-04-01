import { Component, View, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES, Collapse, Rating } from 'ng2-bootstrap';
import { MoviesService } from './movies.service';
import { Movie } from './movie';
import { MovieRatingComponent } from './rating/movie-rating.component';
import template from './movies.component.html!text';
import stylesheet from './movies.component.css!text';

@Component({
  selector: 'movies',
  template: template,
  styles: [stylesheet],
  directives: [MovieRatingComponent, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Collapse, Rating],
  providers: [MoviesService]
})

export class MoviesComponent implements OnInit {
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  movies: Movie[] = [];

  constructor(private _moviesService: MoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  getRating(movie: Movie) {
      return this._moviesService.getRatingForMovie(movie);
  }

  getMovies() {
    this._moviesService.getMovies()
      .subscribe(movies => this.movies = movies);
  }
}
