import { Component, View, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES, Collapse, Rating } from 'ng2-bootstrap';
import { Movie } from './movie';

@Component({
  selector: 'movies',
  templateUrl: 'app/movies/movies.component.html',
  styleUrls: ['app/movies/movies.component.css'],
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
