import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

class MockRouter {
  parseUrl(url: string): UrlTree {
    return new UrlTree(); // Change this to match your expected UrlTree object
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: MockRouter;

  beforeEach(() => {
    router = new MockRouter();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: router }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if authenticated', () => {
    const canActivateResult = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivateResult).toBe(true);
  });

  it('should redirect to login if not authenticated', () => {
    // Implement the logic to simulate not being authenticated
    // For example, you can set the authentication status to false in the AuthService

    const canActivateResult = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivateResult).toEqual(router.parseUrl('/login')); // Adjust the expected redirect URL as per your implementation
  });
});
