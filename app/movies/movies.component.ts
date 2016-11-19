import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie';
//import { MovieRatingComponent } from './rating/movie-rating.component';
//noinspection TypeScriptCheckImport
import template from './movies.component.html';
import './movies.component.scss!';

@Component({
  selector: 'movies',
  template: template,
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
