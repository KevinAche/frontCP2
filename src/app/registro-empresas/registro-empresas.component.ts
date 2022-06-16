import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from '../services/empresa';
import { EmpresaService } from '../services/empresa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro-empresas',
  templateUrl: './registro-empresas.component.html',
  styleUrls: ['./registro-empresas.component.css']
})
export class RegistroEmpresasComponent implements OnInit {

  empresa: Empresa = new Empresa();
  formEmpresa: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private empresaservice: EmpresaService,
  ) { }

  ngOnInit(): void {

    this.formEmpresa = this.formBuilder.group({
      ruc: ['', Validators.required],
      empresa: ['', Validators.required],
      duracionConvenio: ['', Validators.required],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]

    });
    
  }

  public create(): void {

    if (this.formEmpresa.invalid) {
      
      swal.fire(
        'Error de entrada',
        'Revise que los campos no esten vacios',
        'error'
      )
      return;
    }
    this.empresaservice.createEmpresa(this.empresa).subscribe(
      Response => {
        swal.fire(
          'Empresa Guardada',
          `Empresa ${this.empresa.nombreEmpresa} creada con exito!`,
          'success'
        )
        this.limpiar()
      }
    )
    
    
  }

  public limpiar(): void {
    this.empresa.direccion = null;
    this.empresa.duracionConvenio = null;
    this.empresa.idEmpresa = null;
    this.empresa.mision = null;
    this.empresa.vision = null;
    this.empresa.ruc = null;
    this.empresa.telefono = null;
    this.empresa.direccion = null;
    this.empresa.nombreEmpresa = null;
    
  }

}
