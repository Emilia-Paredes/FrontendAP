import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/person.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiServerUrl = environment.apiBaseUrl + '/persona';

  constructor(private httpClient: HttpClient) { }

  public getPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.apiServerUrl}/lista`);
  }

  public detailPersona(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(`${this.apiServerUrl}/buscar/${id}`);
  }

  public addPersona(persona: Persona): Observable<Persona> {
    return this.httpClient.post<Persona>(`${this.apiServerUrl}/crear`, persona);
  }
  
  public updatePersona(persona: Persona): Observable<Persona> {
    return this.httpClient.put<Persona>(`${this.apiServerUrl}/editar`, persona);
  }
  
  public deletePersona(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/eliminar/${id}`);
  }
}
