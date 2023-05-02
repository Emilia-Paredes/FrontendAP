import { Component, OnInit } from '@angular/core';
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


  constructor(private projectService: ProjectService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getProjects();

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getProjects(): void {
    this.projectService.getProject().subscribe(
      data => { this.projects = data; })
  }

}
