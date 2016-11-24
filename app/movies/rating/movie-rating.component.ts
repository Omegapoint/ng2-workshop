import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Movie } from '../movie';
import { IRating } from '../rating';
import { MoviesService } from '../movies.service';
//noinspection TypeScriptCheckImport
import template from './movie-rating.component.html';
import {Router} from "@angular/router";


@Component({
  selector: 'movie-rating',
  template: template
})
export class MovieRatingComponent {
  @Input()
  movie: Movie;
  @Output()
  newRating: EventEmitter<any>;

  movieRating: IRating = {comment: '', rating: 1};

  private x:number = 5;
  private y:number = 2;
  private max:number = 10;
  private isReadonly:boolean = false;

  private overStar:number;
  private percent:number;

  private ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  constructor(private _router: Router, private _moviesService: MoviesService) {
    this.newRating = new EventEmitter();
  }

  hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  resetStar() {
    this.overStar = null;
  }

  addRating() {
    let id = this.movie.id;
    this._moviesService.addRating(id, this.movieRating)
    .subscribe(
      () => this.newRating.next(null)
    );
  }

  showRatings() {
    this._router.navigate(['movie', this.movie.id]);
  }
}
