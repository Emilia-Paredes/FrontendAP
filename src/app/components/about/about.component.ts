import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Persona } from 'src/app/model/person.model';
import { PersonService } from 'src/app/service/person.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public personas: Persona[] = [];
  public updatePerson: Persona | undefined;
  public deletePerson: Persona | undefined;
  rol: string[] = [];
  isLogged = false;

  constructor(private personService: PersonService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getPersonas();
    
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getPersonas(): void {
    this.personService.getPersonas().subscribe({
      next: (response: Persona[]) => {
        this.personas = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(mode: String, persona?: Persona): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonModal');
    } else if (mode === 'edit') {
      this.updatePerson = persona;
      button.setAttribute('data-target', '#updatePersonModal');
    } else if (mode === 'delete') {
      this.deletePerson = persona;
      button.setAttribute('data-target', '#deletePersonModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddPerson(addForm: NgForm): void {
    document.getElementById('add-persona-modal')?.click();
    this.personService.addPersona(addForm.value).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersonas();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdatePerson(persona: Persona): void {
    if(!persona.id) return console.log('No existe el ID')
    let id = persona.id;
    this.personService.updatePersona(id, persona).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersonas();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeletePerson(id: number): void {
    this.personService.deletePersona(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getPersonas();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
