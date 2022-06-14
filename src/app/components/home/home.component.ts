import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public carreras: Array<any> = []
  constructor(
    private carreraService: CarreraService 
    ) {

      this.carreraService.getCarreras().subscribe((resp: any)=>{
        console.log(resp.data)
        this.carreras = resp.data
      })

     }

  ngOnInit(): void {
  }

}
