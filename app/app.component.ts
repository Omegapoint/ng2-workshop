/*import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Component, OnInit } from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import { MoviesComponent } from './movies/movies.component';
import {AuthHttp} from './util/AuthHttp';
import {LoginComponent} from './login/login.component';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {MovieShowRatingComponent} from './movies/rating/movie-show-rating.component';
*/
import { Component, OnInit } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Router, NavigationEnd} from "@angular/router";

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
  </div>
  `,
  styles: [
    `
      .btn[hidden] {
        display: none;
      }
    `
  ]
})

export class AppComponent implements OnInit {
  title = 'Angular 2.0 Workshop';
  loggedout = Cookie.get('auth-token') == null;

  constructor(private router:Router) {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.loggedout = Cookie.get('auth-token') == null;
        }
    });
  }

  public ngOnInit() : void {
    let cookie = Cookie.get('auth-token');
    if (cookie != null) {
      this.router.navigate(['Movies']);
    } else {
      this.router.navigate(['Login']);
    }
  }

  logout() {
    Cookie.delete('auth-token');
    this.router.navigate(['Login']);
  }
}
