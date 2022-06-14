import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {LayoutModule, BreakpointObserver} from '@angular/cdk/layout';
import { CarreraService } from './services/carrera.service';
import { TokenService } from './services/token.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @ViewChild(MatSidenav)
 sidenav: MatSidenav;
  title = 'casopractico-dos';
  loginForm!: FormGroup;
  roles: string[];
  isUser = false;
  isLogged = false;


  constructor(
    private observer: BreakpointObserver,
    private tokenService: TokenService,
    private changeDedectionRef: ChangeDetectorRef
    ) {

    }

  ngOnInit(): void {
    
    this.changeDedectionRef.detectChanges();
    if(this.tokenService.getToken()){
      this.isLogged = true;
      
    }else {
      this.isLogged = false;
    }

   /* this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }); */

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if(rol === 'ROLE_USER'){
        this.isUser = true;
      }
    });
  }

  onLogOut(){
    this.tokenService.logOut();
    window.location.reload();
  }

  onLogIn(){
    window.location.reload();
  }

  ngAfterContentInit() {
    
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  
}