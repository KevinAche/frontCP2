import { Alumno } from "./Alumno";
export class RegistroAsistencia{
    idRegistroAsistencia:Number;
    docRegistroA:string;
    alumno:Alumno;

    constructor(){
        this.alumno =new Alumno();
    }
}