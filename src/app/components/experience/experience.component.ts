import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Experience } from 'src/app/model/experience.model';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  public updateExperience: Experience | undefined;
  public deleteExperience: Experience | undefined;
  rol: string[] = [];
  isLogged = false;

  constructor(private experienceService: ExperienceService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getExperiences();

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getExperiences(): void{
    this.experienceService.getExperience().subscribe({
      next: (Response: Experience[]) => {
        this.experiences = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: String, experience?: Experience): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addExperienceModal');
    } else if (mode === 'delete') {
      this.deleteExperience = experience;
      button.setAttribute('data-target', '#deleteExperience')
    } else if (mode === 'edit') {
      this.updateExperience = experience;
      button.setAttribute('data-target', '#updateExperience')
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddExperience(addForm: NgForm) {
    document.getElementById('add-experience-form')?.click();
    this.experienceService.addExperience(addForm.value).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }  

  public onUpdateExperience(experience: Experience): void {
    if(!experience.id) return console.log('No existe el ID');
    let id = experience.id;
    this.experienceService.updateExperience(id, experience).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteExperience(idExp: number): void {
    this.experienceService.deleteExperience(idExp).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiences();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
