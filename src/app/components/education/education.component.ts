import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Education } from 'src/app/model/education.model';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {

  public educations: Education[] = [];
  public updateEducation: Education | undefined;
  public deleteEducation: Education | undefined;
  // rol: string[];
  rol: string[] = [];
  isLogged = false;
  // isAdmin: boolean = false;

  constructor(private educationService: EducationService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getEducations();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getEducations(): void {
    this.educationService.getEducation().subscribe({
      next: (Response: Education[]) => {
        this.educations = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: String, education?: Education): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducationModal');
    } else if (mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-target', '#deleteEducationModal');
    } else if (mode === 'edit') {
      this.updateEducation = education;
      button.setAttribute('data-target', '#updateEducationModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEducation(addForm: NgForm) {
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe({
      next: (response: Education) => {
        console.log(response);
        this.getEducations();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateEducation(education: Education): void {
    if(!education.id) return console.log('No existe el ID')
    let id = education.id;
    this.educationService.updateEducation(id, education).subscribe({
      next: (response: Education) => {
        console.log(response);
        this.getEducations();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteEducation(idEdu: number): void {
    this.educationService.deleteEducation(idEdu).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEducations();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
