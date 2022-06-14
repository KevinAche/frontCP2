import { SolicitudEmpresa } from "./SolicitudEmpresa";
export class Convocatoria{
    id_convocatorias : any;
    doc_convocatoria: any;
    fecha_emision: any;
    fecha_maxima: any;
    solicitud_Empresa : SolicitudEmpresa;

    constructor(){
       this.solicitud_Empresa = new SolicitudEmpresa();
    }
}
