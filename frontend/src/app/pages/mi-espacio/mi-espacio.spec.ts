import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiEspacio } from './mi-espacio';

describe('MiEspacio', () => {
  let component: MiEspacio;
  let fixture: ComponentFixture<MiEspacio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiEspacio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiEspacio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
