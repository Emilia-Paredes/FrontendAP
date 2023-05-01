import { Component, OnInit } from '@angular/core';
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

  constructor(private experienceService: ExperienceService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getExperience();

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getExperience(): void{
    this.experienceService.getExperience().subscribe(
      data => {this.experiences = data;})
  }
}
