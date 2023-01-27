import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boite } from '../models/boite';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BoiteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getBoites(): Observable<Boite[]> {
    return this.http.get<Boite[]>(`${this.apiServerUrl}/boite/all`);
  }

  public addBoite(boite: Boite): Observable<Boite> {
    return this.http.post<Boite>(`${this.apiServerUrl}/boite/add`, boite);
  }

  public updateBoite(boite: Boite): Observable<Boite> {
    return this.http.put<Boite>(`${this.apiServerUrl}/boite/update`, boite);
  }

  public deleteBoite(boiteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/boite/delete/${boiteId}`);
  }
}

