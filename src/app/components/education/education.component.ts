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

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.getEducations();
  }

  public getEducations():void {
    this.educationService.getEducation().subscribe({
      next:(Response: Education[]) => {
        this.educations = Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
