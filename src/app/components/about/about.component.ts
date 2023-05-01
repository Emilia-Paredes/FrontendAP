// import { persona } from 'src/app/model/person.model';
import { Persona } from 'src/app/model/person.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/service/person.service';
// import { TokenService } from 'src/app/service/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public persona: Persona | undefined;
  public editarPersona: Persona | undefined;
  isAdmin: boolean = false;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersona();
  }

  // public getPersona():void {
  //   this.personService.getPersona().subscribe(
  //     next?: ((response:Persona) => this.persona = response),
  //     error?: ((error: HttpErrorResponse) => console.log(error.message))
  //   )
  // }
  public getPersona(): void {
    this.personService.getPersona().subscribe(
      (response: Persona) => {
        this.persona = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }



  // persona: persona = new persona(0,"","","", "", "");

  // constructor(private personService: PersonService) { }

  // ngOnInit(): void {
  //   this.getPersona();
  // }

  // public getPersona():void {
  //   this.personService.verPersonas().subscribe({
  //     next: (response: persona) => {
  //       this.persona = response;
  //     }, 
  //     error: (error:HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   })
  // }

}
