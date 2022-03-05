import { TestBed } from '@angular/core/testing';

import { DatosPortfolioService } from './datos-portfolio.service';

describe('DatosPortfolioService', () => {
  let service: DatosPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
