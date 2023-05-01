import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { SkillService } from 'src/app/service/skill.service';
import { Skill } from 'src/app/model/skill.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private skillService: SkillService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getSkills();

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getSkills(): void{
    this.skillService.getSkill().subscribe(
      data => {this.skills = data;})
  }

}
