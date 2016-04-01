import { Component, View, OnInit, EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES, Collapse, Rating } from 'ng2-bootstrap';
import { Movie } from '../movie';
import { IRating } from '../rating';
import { MoviesService } from '../movies.service';
import template from './movie-rating.component.html!text';
import stylesheet from '../movies.component.css!text';

@Component({
  selector: 'movie-rating',
  template: template,
  styles: [stylesheet],
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Collapse, Rating],
  inputs: ['movie'],
  events: ['newRating']
})

export class MovieRatingComponent {
  movie: Movie;
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

  private hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  private resetStar() {
    this.overStar = null;
  }

  private addRating() {
    let id = this.movie.id;
    this._moviesService.addRating(id, this.movieRating)
    .subscribe(
      data => console.log("statusCode after update: " + data.status),
      err => console.log("error: " + JSON.stringify(err)),
      () => this.newRating.next(null)
    );
  }

  showRatings() {
    this._router.navigate(['MovieShowRating', { id: this.movie.id }]);
  }
}
