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
  showDialogEdit(emp:Empresa):void {
    this.dis= true;
    this.empresa = {
      idEmpresa: emp.idEmpresa,
      nombreEmpresa: emp.nombreEmpresa,
      direccion: emp.direccion,
      telefono : emp.telefono,
      mision:emp.mision,
      vision:emp.vision,
      duracionConvenio: emp.duracionConvenio,
      ruc: emp.ruc,
      naturaleza: emp.naturaleza
    };
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
      { field: 'naturaleza', header: 'Naturaleza' },
      { field: 'size', header: 'Acciones' },
      
    ];
    this.listarEmpresas();
  }

  editarEmpresa():void {
    if (this.formEmpresa.invalid) {
      console.log("invalido")
      return;
    }

    this.empresaservice.updateEmpresa(this.empresa).subscribe(empresa => {
      swal.fire('Empresa','Empresa editada con exito.','success')
      this.listarEmpresas();
    })
    this.dis = false;
  }

  listarEmpresas():void {
    this.empresaservice.getEmpresas().then(value => {
      this.empresas=value['data'];
      console.log(this.empresas)
    })
  }

  eliminarEmpresa(emp: Empresa): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro que desea eliminar?',
      text: `¡No podrás revertir esto! eliminar a ${emp.nombreEmpresa}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar! ',
      cancelButtonText: ' No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaservice.deleteEmpresa(emp.idEmpresa).subscribe(
          response => {
            this.empresas = this.empresas.filter(servi => servi !== emp)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `La empresa  fue eliminada.`,
              'success'
            )
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La empresa no se elimino.',
          'error'
        )
      }
    })
  }
  
}
