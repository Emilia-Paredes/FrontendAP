import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/service/token.service';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/model/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  public updateProject: Project | undefined;
  public deleteProject: Project | undefined;
  rol: string[] = [];
  isLogged = false;

  constructor(private projectService: ProjectService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getProjects();

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getProjects(): void {
    this.projectService.getProject().subscribe({
      next: (Response: Project[]) => {
        this.projects = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: String, project?: Project): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    } else if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    } else if(mode === 'edit') {
      this.updateProject = project;
      button.setAttribute('data-target', '#updateProjectModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddProject(addForm: NgForm) {
    document.getElementById('add-project-form')?.click();
    this.projectService.addProject(addForm.value).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
        addForm.reset(); 
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateProject(project: Project): void {
    if(!project.id) return console.log('No existe el ID');
    let id = project.id;
    this.projectService.updateProject(id, project).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProjects();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  
}
