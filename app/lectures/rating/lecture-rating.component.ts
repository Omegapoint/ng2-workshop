import {Component, Input, Output, EventEmitter} from '@angular/core';
import { IRating } from '../rating';

//noinspection TypeScriptCheckImport
import template from './lecture-rating.component.html';
import {Router} from "@angular/router";
import {LecturesService} from "../lectures.service";
import {Lecture} from "../lecture";


@Component({
  selector: 'lecture-rating',
  template: template
})
export class LectureRatingComponent {
  @Input()
  lecture: Lecture;
  @Output()
  newRating: EventEmitter<any>;

  lectureRating: IRating = {comment: '', rating: 1};

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

  constructor(private _router: Router, private lecturesService: LecturesService) {
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
    //TODO: implement this
  }

  showRatings() {
    this._router.navigate(['lecture', this.lecture.id]);
  }
}
