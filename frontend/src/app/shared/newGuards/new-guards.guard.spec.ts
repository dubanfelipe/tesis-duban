import { TestBed } from '@angular/core/testing';

import { NewGuardsGuard } from './new-guards.guard';

describe('NewGuardsGuard', () => {
  let guard: NewGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
