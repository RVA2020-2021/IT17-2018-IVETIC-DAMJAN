import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sektor_URL } from '../app.constants';
import { Sektor } from '../models/sektor';

@Injectable({
  providedIn: 'root'
})
export class SektorService {

  constructor(private httpClient: HttpClient) { }

  public getAllSektori(): Observable<any> {
    return this.httpClient.get(`${Sektor_URL}`)
  }

  public addSektor(sektor: Sektor): Observable<any> {
    sektor.id=0;
    return this.httpClient.post(`${Sektor_URL}`, sektor);
  }

  public updateSektor(sektor: Sektor): Observable<any> {
    return this.httpClient.put(`${Sektor_URL}`, sektor);
  }

  public deleteSektor(id: number): Observable<any> {
    return this.httpClient.delete(`${Sektor_URL}/${id}`);
  }
}
