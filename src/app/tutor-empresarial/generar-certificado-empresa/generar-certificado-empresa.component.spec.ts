import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCertificadoEmpresaComponent } from './generar-certificado-empresa.component';

describe('GenerarCertificadoEmpresaComponent', () => {
  let component: GenerarCertificadoEmpresaComponent;
  let fixture: ComponentFixture<GenerarCertificadoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarCertificadoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCertificadoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
