import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Education } from 'src/app/model/education.model';
import { EducationService } from 'src/app/service/education.service';



@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {

  public educations: Education[] = [];
  public editEducation: Education | undefined;
  public deleteEducation: Education | undefined;
  public updateEducation: Education | undefined;

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.getEducations();
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
    this.editEducation = education;
    button.setAttribute('data-target', '#editEducationModal');
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

  public onUpdateEducation(id: number, education: Education): void {
    this.updateEducation = education;
    document.getElementById('add-education-form')?.click();
    this.educationService.updateEducation(id, this.updateEducation).subscribe({
      next: (response: Education) => {
        console.log(response);
        this.getEducations();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteEducation(id: number): void {

    this.educationService.deleteEducation(id).subscribe({
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
