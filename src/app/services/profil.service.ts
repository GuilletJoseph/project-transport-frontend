import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProfilService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${this.apiServerUrl}/profil/all`);
  }

  public addProfil(profil: Profil): Observable<Profil> {
    return this.http.post<Profil>(`${this.apiServerUrl}/profil/add`, profil);
  }

  public updateProfil(profil: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.apiServerUrl}/profil/update`, profil);
  }

  public deleteProfil(profilId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/profil/delete/${profilId}`);
  }
}
