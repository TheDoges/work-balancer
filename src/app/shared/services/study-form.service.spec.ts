import { TestBed, inject } from '@angular/core/testing';

import { StudyFormService } from './study-form.service';

describe('StudyFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyFormService]
    });
  });

  it('should be created', inject([StudyFormService], (service: StudyFormService) => {
    expect(service).toBeTruthy();
  }));
});
