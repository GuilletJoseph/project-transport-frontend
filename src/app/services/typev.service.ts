import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeV } from '../models/typev';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypevService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getTypeVs(): Observable<TypeV[]> {
    return this.http.get<TypeV[]>(`${this.apiServerUrl}/typev/all`);
  }

  public addTypeV(typeV: TypeV): Observable<TypeV> {
    return this.http.post<TypeV>(`${this.apiServerUrl}/typev/add`, typeV);
  }

  public updateTypeV(typeV: TypeV): Observable<TypeV> {
    return this.http.put<TypeV>(`${this.apiServerUrl}/typev/update`, typeV);
  }

  public deleteTypeV(TypeVId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/typev/delete/${TypeVId}`);
  }
}
