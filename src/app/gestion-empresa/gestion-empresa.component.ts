import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from '../services/empresa';
import { EmpresaService } from '../services/empresa.service';
import swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { ActividadesService } from '../services/actividades.service';
import { EmpleadoService } from '../services/empleado.service'
import { Actividades } from '../models/Actividades';
import { TokenService } from '../services/token.service';
import { ConvenioService } from '../services/convenio.service';
import { Convenio } from '../models/Convenio';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-gestion-empresa',
  templateUrl: './gestion-empresa.component.html',
  styleUrls: ['./gestion-empresa.component.css'],
  providers: [MessageService]
})
export class GestionEmpresaComponent implements OnInit {

  empresa: Empresa = new Empresa();
  formEmpresa: FormGroup;
  formActividades: FormGroup;
  formConvenio: FormGroup;
  cols: any[];
  colsAct: any[];
  
  dis: boolean;
  createConvenio: boolean;
  createActividades: boolean;
  refresh = true;

  empresas : Empresa[];
  actividad: Actividades = new Actividades();
  actividades: Actividades[] = new Array <Actividades>();
  gerente: any;
  convenio: Convenio = new Convenio();
 



  showDialog() {
    this.empresa.direccion = null;
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
      ruc: emp.ruc,
      naturaleza: emp.naturaleza
    };
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private empresaservice: EmpresaService,
    public messageService: MessageService,
    private actividadesService: ActividadesService,
    private empleadoService: EmpleadoService,
    private tokenService: TokenService,
    private convenioService: ConvenioService
  ) { }

  ngOnInit(): void {
    this.createConvenio=false;

    this.formEmpresa = this.formBuilder.group({
      ruc: ['', Validators.required],
      empresa: ['', Validators.required],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      

    });

    this.formConvenio = this.formBuilder.group({
      duracion: ['', Validators.required],
      fechaEmision: ['', Validators.required],
    })

    this.formActividades = this.formBuilder.group({
      descripcion: ['', Validators.required]

    });

    this.colsAct = [
      { field: 'idActividad', header: 'Id' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'accion', header: 'Acciones' },
    ]

    this.cols = [
      { field: 'ruc', header: 'Ruc' },
      { field: 'nombreEmpresa', header: 'Empresa' },
      { field: 'vision', header: 'Vision' },
      { field: 'mision', header: 'Mision' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'naturaleza', header: 'Naturaleza' },
      { field: 'size', header: 'Acciones' },
      { field: 'convenio', header: 'Convenio' },
      { field: 'documento', header: 'Documento' },

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

  getGerente (idEmpresa){
    
    this.empleadoService.getGerente(idEmpresa).then(value => {
      this.gerente=value['data'];
      if(this.gerente[0]){
      
          console.log(this.gerente[0].persona.primerNombre);
          
          
      } else {
        console.log("NO TIENE GERENTE")
      
        
      }
    })
    
    
  }


  eliminarActividad(id){
    this.actividadesService.deleteActividad(id).then(res=>{
      console.log("Actividad eliminada");
      this.getActividades()
    })
  }

  getActividades(){
    this.actividadesService.getActividades().subscribe(res => {
      this.actividades = res['data']
    })
  }

  agregarActividad(){
    if(this.formActividades.invalid){
      console.log("ACTIVIDAD ERROR")
    }else {
      this.actividad.convenio=this.convenio[0]
      this.actividadesService.createActividades(this.actividad).then(res => {
        console.log(this.actividad)
        this.getActividades()
      })

      
    }
    
  }

  crearConvenio(id){
    this.createConvenio = true
    this.getGerente(id);
  }

  guardarConvenio(){
    console.log(this.convenio.fechaEmision)
    this.convenioService.createConvenio2
          (this.convenio,this.gerente[0].persona.cedula,this.tokenService.getUserName()).then(res => {
            this.convenio = res['data']    
            console.log(this.convenio);
                
          });

    this.createConvenio = false;
    this.createActividades = true;
  }


  updateVisibility(): void {
    this.refresh = false;
    setTimeout(() => this.refresh = true, 0);
  }


  generate(empresa, gerente, actividades) {
    loadFile("http://localhost:8082/files/convocatoria.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }


  
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        nombreEmpresa: "",
        duracion: "2501"
      });
      try {
        // Se reemplaza en el documento: {rpp} -> John, {numestudiantes} -> Doe ....
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);

        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, "output.docx");
    });
  }
  
}
