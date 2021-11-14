import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharEventosComponent } from './acompanhar-eventos.component';

describe('AcompanharEventosComponent', () => {
  let component: AcompanharEventosComponent;
  let fixture: ComponentFixture<AcompanharEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanharEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanharEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
