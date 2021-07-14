import { TestBed } from '@angular/core/testing';

import { PruebacAGuard } from './pruebac-a.guard';

describe('PruebacAGuard', () => {
  let guard: PruebacAGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PruebacAGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
