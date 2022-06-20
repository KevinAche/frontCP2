import { Component, OnInit } from '@angular/core';
import {Empleado} from "../../models/Empleado";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmpleadoService} from "../../services/empleado.service";
import {Persona} from "../../models/Persona";

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  empleado = new Empleado();
  formEmpleado = FormGroup;
  persona: Persona;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
  }

}
