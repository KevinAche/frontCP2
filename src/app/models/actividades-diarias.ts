import { RegistroAsistencia } from "./RegistroAsistencia";
export class ActividadesDiarias{

    idActividadesD:Number;
    fecha:String;
    horaLlegada:String;
    horaSalida:String;
    descripcion:String;
    numHoras:number;
    registroAsistencia:RegistroAsistencia;

    constructor(){
        this.registroAsistencia = new RegistroAsistencia();
    }

}