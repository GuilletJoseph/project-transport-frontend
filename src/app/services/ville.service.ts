import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ville } from '../models/ville';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class VilleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.apiServerUrl}/ville/all`);
  }

  public addVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(`${this.apiServerUrl}/ville/add`, ville);
  }

  public updateVille(ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(`${this.apiServerUrl}/ville/update`, ville);
  }

  public deleteVille(villeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ville/delete/${villeId}`);
  }
}
