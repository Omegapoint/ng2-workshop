import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Component, OnInit } from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import { MoviesComponent } from './movies/movies.component';
import {RestResource} from './util/RestResource';
import {LoginComponent} from './login/login.component';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {MovieShowRatingComponent} from './movies/rating/movie-show-rating.component';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="row" style="margin-top:5px">
      <div class="col-sm-12">
        <button [hidden]="loggedout" class="btn btn-primary pull-right" (click)="logout()">Logout</button>
      </div>
    </div>
    <div class="row" style="margin-top:5px">
      <div class="col-sm-12">
        <alert type="info">{{title}}</alert>
      </div>
    </div>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [
    `
      .btn[hidden] {
        display: none;
      }
    `
  ],
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
  },
  {
    path: '/movies/:id',
    name: 'MovieShowRating',
    component: MovieShowRatingComponent
  }
])
export class AppComponent implements OnInit {
  title = 'Angular 2.0 Workshop';
  loggedout = Cookie.getCookie('auth-token') == null;

  constructor(private _router:Router) {
    _router.subscribe(route => {
        this.loggedout = Cookie.getCookie('auth-token') == null;
    });
  }

  ngOnInit() {
    let cookie = Cookie.getCookie('auth-token');
    if (cookie != null) {
      this._router.navigate(['Movies']);
    } else {
      this._router.navigate(['Login']);
    }
  }

  logout() {
    Cookie.deleteCookie('auth-token');
    this._router.navigate(['Login']);
  }
}
