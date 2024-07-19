import { TestBed } from '@angular/core/testing';

import { PasswordMangerService } from './password-manger.service';

describe('PasswordMangerService', () => {
  let service: PasswordMangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordMangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
