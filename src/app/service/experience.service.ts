import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../model/experience.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiServerUrl = environment.apiBaseUrl + '/experiencia';

  constructor(private httpClient: HttpClient) { }

  public getExperience(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(`${this.apiServerUrl}/lista`);
  }

  public detailExperience(id: number): Observable<Experience> {
    return this.httpClient.get<Experience>(`${this.apiServerUrl}/editar/${id}`);
  }

  public saveExperience(experience: Experience): Observable<any> {
    return this.httpClient.post<any>(`${this.apiServerUrl}/crear`, experience);
  }

  public updateExperience(id: number, experience: Experience): Observable<any> {
    return this.httpClient.put<any>(`${this.apiServerUrl}/editar/${id}`, experience);
  }

  public deleteExperience(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiServerUrl}/eliminar/${id}`);
  }
}
