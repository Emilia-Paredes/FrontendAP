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

  // public verPersonas(): Observable<Persona> {
  //   return this.http.get<Persona>(`${this.apiServerUrl}/ver`);
  // }

  // __________________
  public getPersona(): Observable<Persona> {
    return this.httpClient.get<Persona>(`${this.apiServerUrl}/buscar/2`);
  }

  // public updatePersona(persona: Persona): Observable<Persona> {
  //   return this.http.put<Persona>(`${this.apiServerUrl}/editar`, persona);
  // } 

  // public addPersona(persona: Persona): Observable<Persona> {
  //   return this.http.post<Persona>(`${this.apiServerUrl}/persona/add`, persona);
  // }

  // public deletePersona(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/persona/delete/${id}`);
  // }
}
