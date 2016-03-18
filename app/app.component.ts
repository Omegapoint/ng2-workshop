import { Component } from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import { MoviesComponent } from './movies/movies.component';
import {RestResource} from './util/RestResource';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="row" style="margin-top:20px">
      <div class="col-sm-12">
        <alert type="info">{{title}}</alert>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <movies></movies>
      </div>
    </div>
  </div>
  `,
  directives: [Alert, MoviesComponent],
  providers: [RestResource]
})

export class AppComponent {
  title = 'Angular 2.0 Workshop';
}
