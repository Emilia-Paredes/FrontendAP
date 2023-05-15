import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Skill } from 'src/app/model/skill.model'


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiServerUrl = environment.apiBaseUrl + '/skill';

  constructor(private httpClient: HttpClient) { }

  public getSkill(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`${this.apiServerUrl}/lista`);
  }

  public detailSkill(id: number): Observable<Skill> {
    return this.httpClient.get<Skill>(`${this.apiServerUrl}/buscar/${id}`);
  }

  public addSkill(skill: Skill): Observable<any> {
    return this.httpClient.post<any>(`${this.apiServerUrl}/crear`, skill);
  }

  public updateSkill(id: number, skill: Skill): Observable<any> {
    return this.httpClient.put<any>(`${this.apiServerUrl}/editar/${id}`, skill);
  }

  public deleteSkill(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiServerUrl}/eliminar/${id}`);
  }
}
