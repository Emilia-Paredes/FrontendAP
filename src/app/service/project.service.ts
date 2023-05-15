import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project.model'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiServerUrl = environment.apiBaseUrl + '/proyectos';

  constructor(private httpClient: HttpClient) { }

  public getProject(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.apiServerUrl}/lista`);
  }

  public detailProject(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.apiServerUrl}/buscar/${id}`);
  }

  public addProject(project: Project): Observable<any> {
    return this.httpClient.post<any>(`${this.apiServerUrl}/crear`, project);
  }

  public updateProject(id: number, project: Project): Observable<any> {
    return this.httpClient.put<any>(`${this.apiServerUrl}/editar/${id}`, project);
  }

  public deleteProject(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiServerUrl}/eliminar/${id}`);
  }
}
