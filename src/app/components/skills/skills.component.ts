import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
  public skills: Skill[] = [];
  public updateSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;
  rol: string[] = [];
  isLogged = false;

  constructor(private skillService: SkillService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getSkills();

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getSkills(): void {
    this.skillService.getSkill().subscribe({
      next: (Response: Skill[]) => {
        this.skills = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: String, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-target', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
    } else if(mode === 'edit') {
      this.updateSkill = skill;
      button.setAttribute('data-target', '#updateSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddSkill(addForm: NgForm) {
    document.getElementById('add-skill-form')?.click();
    this.skillService.addSkill(addForm.value).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateSkill(skill: Skill): void {
    if(!skill.id) return console.log('No existe el ID');
    let id = skill.id;
    this.skillService.updateSkill(id, skill).subscribe({
      next: (response: Skill) => {
        console.log(response);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteSkill(id: number): void {
    this.skillService.deleteSkill(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }
}
