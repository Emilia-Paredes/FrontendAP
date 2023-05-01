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

  constructor(private http: HttpClient) { }

  public getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiServerUrl}/lista`);
  }

  public addEducation(educacion: Education): Observable<Education> {
    return this.http.post<Education>(`${this.apiServerUrl}/agregar`,educacion);
  }

  public updateEducation(educacion: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiServerUrl}/editar`,educacion);
  }

  public deleteEducation(educationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/borrar/${educationId}`);
  }
}
