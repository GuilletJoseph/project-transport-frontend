import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class VehiculeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiServerUrl}/vehicule/all`);
  }

  public addVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(`${this.apiServerUrl}/vehicule/add`, vehicule);
  }

  public updateVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiServerUrl}/vehicule/update`, vehicule);
  }

  public deleteVehicule(vehiculeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/vehicule/delete/${vehiculeId}`);
  }
}

