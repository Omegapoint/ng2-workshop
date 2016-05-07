import {HTTP_PROVIDERS} from "angular2/http";
import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  setBaseTestProviders
} from 'angular2/testing';

import {AuthHttp} from './AuthHttp';

describe('RestResource', () => {
  beforeEachProviders(() => [HTTP_PROVIDERS, AuthHttp]);

  it('request should be undefined with faulty parameters', inject([AuthHttp], (authHttp: AuthHttp) => {
    expect(authHttp.request(null, null)).toBeUndefined();
  }));
});
