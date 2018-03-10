import { TestBed, inject } from '@angular/core/testing';

import { StudyKindService } from './study-kind.service';

describe('StudyKindService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyKindService]
    });
  });

  it('should be created', inject([StudyKindService], (service: StudyKindService) => {
    expect(service).toBeTruthy();
  }));
});
