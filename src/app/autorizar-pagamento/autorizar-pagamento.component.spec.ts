import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarPagamentoComponent } from './autorizar-pagamento.component';

describe('AutorizarPagamentoComponent', () => {
  let component: AutorizarPagamentoComponent;
  let fixture: ComponentFixture<AutorizarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
