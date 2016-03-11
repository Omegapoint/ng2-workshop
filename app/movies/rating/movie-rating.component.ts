import { Component, View, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES, Collapse, Rating } from 'ng2-bootstrap';
import { Movie } from '../movie';

@Component({
  selector: 'movie-rating',
  templateUrl: 'app/movies/rating/movie-rating.component.html',
  styleUrls: ['app/movies/movies.component.css'],
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Collapse, Rating],
  inputs: ['movie']
})

export class MovieRatingComponent {
  movie: Movie;

  private x:number = 5;
  private y:number = 2;
  private max:number = 10;
  private rate:number = 7;
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

  private hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  private resetStar() {
    this.overStar = null;
  }
}
