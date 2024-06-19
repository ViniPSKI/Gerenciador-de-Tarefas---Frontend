import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { taskResolverGuard } from '../task-resolver.guard';

describe('taskResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => taskResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
