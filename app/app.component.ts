import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Component, OnInit } from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import { MoviesComponent } from './movies/movies.component';
import {RestResource} from './util/RestResource';
import {LoginComponent} from './login/login.component';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="row" style="margin-top:20px">
      <div class="col-sm-12">
        <alert type="info">{{title}}</alert>
      </div>
    </div>
    <router-outlet></router-outlet>
  </div>
  `,
  directives: [ROUTER_DIRECTIVES, Alert, MoviesComponent],
  providers: [ROUTER_PROVIDERS, RestResource]
})

@RouteConfig([
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesComponent
  }
])
export class AppComponent implements OnInit {
  title = 'Angular 2.0 Workshop';

  constructor(private _router:Router) {}

  ngOnInit() {
    let cookie = Cookie.getCookie('auth-token');
    if (cookie != null) {
      this._router.navigate(['Movies']);
    } else {
      this._router.navigate(['Login']);
    }
  }
}
