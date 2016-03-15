import { Component, View, OnInit, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES, Collapse, Rating } from 'ng2-bootstrap';
import { Movie } from '../movie';
import { IRating } from '../rating';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movie-rating',
  templateUrl: 'app/movies/rating/movie-rating.component.html',
  styleUrls: ['app/movies/movies.component.css'],
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Collapse, Rating],
  inputs: ['movie'],
  events: ['newRating']
})

export class MovieRatingComponent {
  movie: Movie;
  newRating: EventEmitter<any>;

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

  constructor(private _moviesService: MoviesService) {
    this.newRating = new EventEmitter();
  }

  private hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  private resetStar() {
    this.overStar = null;
  }

  private addRating() {
    let id = this.movie.id;
    let rating:IRating = {comment: this.movie.rating.comment, rating: this.movie.rating.rating};
    this._moviesService.addRating(id, rating)
    .subscribe(
      data => console.log("statusCode after update: " + data.status),
      err => console.log("error: " + JSON.stringify(err)),
      () => this.newRating.next(null)
    );
  }
}
