import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../model/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiServerUrl = environment.apiBaseUrl + '/educacion';

  constructor(private httpClient: HttpClient) { }

  public getEducation(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(`${this.apiServerUrl}/lista`);
  }

  public addEducation(educacion: Education): Observable<Education> {
    return this.httpClient.post<Education>(`${this.apiServerUrl}/create`, educacion);
  }

  public updateEducation(educacion: Education): Observable<Education> {
    return this.httpClient.put<Education>(`${this.apiServerUrl}/update`, educacion);
  }

  // public updateEducation(id: number, educacion: Education): Observable<any> {
  //   return this.httpClient.put<any>(`${this.apiServerUrl}/update/${id}`, educacion);
  // }

  public deleteEducation(educationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/delete/${educationId}`);
  }
}
