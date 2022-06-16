import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from '../services/empresa';
import { EmpresaService } from '../services/empresa.service';
import swal from 'sweetalert2';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-gestion-empresa',
  templateUrl: './gestion-empresa.component.html',
  styleUrls: ['./gestion-empresa.component.css'],
  providers: [MessageService]
})
export class GestionEmpresaComponent implements OnInit {

  empresa: Empresa = new Empresa();
  formEmpresa: FormGroup;
  cols: any[];
  dis: boolean;
  empresas : Empresa[];


  showDialog() {
    this.empresa.direccion = null;
    this.empresa.duracionConvenio = null;
    this.empresa.idEmpresa = null;
    this.empresa.mision = null;
    this.empresa.vision = null;
    this.empresa.ruc = null;
    this.empresa.telefono = null;
    this.empresa.direccion = null;
    this.empresa.nombreEmpresa = null;
    this.dis = true;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private empresaservice: EmpresaService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.formEmpresa = this.formBuilder.group({
      ruc: ['', Validators.required],
      empresa: ['', Validators.required],
      duracionConvenio: ['', Validators.required],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      nombreEmpresa: ['', Validators.required]

    });

    this.cols = [
      { field: 'ruc', header: 'Ruc' },
      { field: 'nombreEmpresa', header: 'Empresa' },
      { field: 'vision', header: 'Vision' },
      { field: 'mision', header: 'Mision' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'duracionConvenio', header: 'Convenio' },
      { field: 'size', header: 'Acciones' },
    ];
    // this.listarEmpresas();
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

  // listarEmpresas():void {
  //   this.empresaservice.getEmpresas().then(value => {
  //     this.empresas=value['data'];
  //     console.log(this.empresas)
  //   })
  // }

}
