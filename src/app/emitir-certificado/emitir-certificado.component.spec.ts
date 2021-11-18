import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirCertificadoComponent } from './emitir-certificado.component';

describe('EmitirCertificadoComponent', () => {
  let component: EmitirCertificadoComponent;
  let fixture: ComponentFixture<EmitirCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmitirCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmitirCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
