import { Component, View, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES, Collapse, Rating } from 'ng2-bootstrap';
import { Movie } from './movie';
import template from './movies.component.html!text';
import stylesheet from './movies.component.css!text';

@Component({
  selector: 'movies',
  template: template,
  styles: [stylesheet],
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Collapse, Rating]
})

export class MoviesComponent implements OnInit {
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  movies: Movie[] = [];

  ngOnInit() {

  }
}
