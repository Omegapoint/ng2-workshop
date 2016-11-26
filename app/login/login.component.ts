import { User } from './user';
import {API_URL} from '../conf';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Component, OnInit} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  template: `
  <div class="row">
    <div class="col-sm-6">
      <h1>Inloggning</h1>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      
        <div class="form-group">
          <label for="name">Namn</label>
          <input id="name" name="first" type="text" class="form-control" required
            [(ngModel)]="user.name" ngControl="name" #name="ngModel">
          <div [hidden]="name.valid || name.pristine && !name.touched" class="alert alert-danger">
            Name is required
          </div>
          <label for="password">Lösenord</label>
          <input id="password" name="second" type="password" class="form-control" required
            [(ngModel)]="user.password" ngControl="password" #password="ngModel">
          <div [hidden]="password.valid || password.pristine && !password.touched" class="alert alert-danger">
            Password is required
          </div>
        </div>
        <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Submit</button>
        <div [hidden]="!authFailure" class="alert alert-danger" style="margin-top:10px">
          Invalid username or password, please try again.
        </div>
        
      </form>
    </div>
  </div>
  `,
  styles: [`
    input.ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }

    input.ng-touched.ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
  `]
})

export class LoginComponent implements OnInit {
  user: User = {name: '', password: ''};
  submitted = false;
  authFailure = false;

  constructor(private _http:Http, private _router:Router) {}

  onSubmit() {
    var body = "user_id=" + this.user.name + "&password=" + this.user.password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post(API_URL + '/authenticate', body, {
      headers: headers
    })
    .map(response => response.json())
    .subscribe(
      data => {
        Cookie.set('auth-token', data.token);
        this._router.navigate(['lectures']);
      },
      err => this.authFailure = true
    );
    this.submitted = true;
  }

  ngOnInit() {
    let cookie = Cookie.get('auth-token');
    if (cookie != null) {
      this._router.navigate(['lectures']);
    } else {
      this._router.navigate(['login']);
    }
  }
}
