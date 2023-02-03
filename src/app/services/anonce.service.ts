import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anonce } from '../models/anonce';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AnonceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAnonces(): Observable<Anonce[]> {
    return this.http.get<Anonce[]>(`${this.apiServerUrl}/anonce/all`);
  }

  public addAnonce(anonce: Anonce): Observable<Anonce> {
    return this.http.post<Anonce>(`${this.apiServerUrl}/anonce/add`, anonce);
  }

  public updateAnonce(anonce: Anonce): Observable<Anonce> {
    return this.http.put<Anonce>(`${this.apiServerUrl}/anonce/update`, anonce);
  }

  public deleteAnonce(anonceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/anonce/delete/${anonceId}`);
  }
}
