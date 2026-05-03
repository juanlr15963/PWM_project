import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fragancia } from './fragancia';

describe('Fragancia', () => {
  let component: Fragancia;
  let fixture: ComponentFixture<Fragancia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fragancia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fragancia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
