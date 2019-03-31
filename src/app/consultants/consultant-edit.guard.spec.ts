import { TestBed, async, inject } from '@angular/core/testing';

import { ConsultantEditGuard } from './consultant-edit.guard';

describe('ConsultantEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantEditGuard]
    });
  });

  it('should ...', inject([ConsultantEditGuard], (guard: ConsultantEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
