import {HTTP_PROVIDERS, XHRBackend, Http, Response} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';
import {ResponseOptions} from 'angular2/http';
import {ROUTER_PROVIDERS, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT, Location} from 'angular2/router';
import {SpyLocation} from 'angular2/router/testing';
import { provide, ApplicationRef } from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  setBaseTestProviders,
  MockApplicationRef,
} from 'angular2/testing';
import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';

import {LoginComponent} from './login.component';
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
                     TEST_BROWSER_APPLICATION_PROVIDERS);

import 'rxjs/add/operator/map';

class MockPrimaryComponent {
}

class MockRouter {
  navigate() {
  
  }
}
describe('LoginComponent', () => {

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, {useClass: MockBackend}),
    ROUTER_PROVIDERS,
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useClass: MockPrimaryComponent}),
    provide(Router, {useClass: MockRouter}),
    LoginComponent,
    provide(ApplicationRef, { useClass: MockApplicationRef })
  ]);

it('token should be set in cookie', inject([XHRBackend, LoginComponent], (mockBackend, loginComponent) => {
  mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body:
                {
                  token: "abc"
                }
            }
          )));
      });

    loginComponent.onSubmit();
    expect(Cookie.getCookie('auth-token')).toBe('abc');
  }));

  it('authentication failure should result in an update of authFailure', inject([XHRBackend, LoginComponent], (mockBackend, loginComponent) => {
    mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new ResponseOptions({status: 403}));
      });

      loginComponent.onSubmit();
      expect(loginComponent.authFailure).toBeTruthy();
    }));
});
