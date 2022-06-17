import { Convocatoria } from "./Convocatoria";
import { Alumno } from "./Alumno";

export class SolicitudAlumno{
    idSolicitudAlumno: number;
    fechaEmision: String;
    estado: String;
    convocatoria: Convocatoria;
    alumno:Alumno;
    horasPPP:String;

    constructor(){
        this.alumno = new Alumno();
        this.convocatoria = new Convocatoria();
    }

}
