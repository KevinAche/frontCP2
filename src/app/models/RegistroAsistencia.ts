import { Alumno } from "./Alumno";
export class RegistroAsistencia{
    RegistroAsistencia:Number;
    docRegistroA:string;
    alumno:Alumno;

    constructor(){
        this.alumno =new Alumno();
    }
}