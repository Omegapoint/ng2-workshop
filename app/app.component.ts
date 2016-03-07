import { Component } from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'my-app',
  template: `
  <div style="width:50%;margin-top:20px;margin-left:20px">
    <alert type="info">{{title}}</alert>
  </div>
  `,
  directives: [Alert]
})

export class AppComponent {
  title = 'Angular 2.0 Workshop';
}
