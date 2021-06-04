import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RadnikSektor_URL, Radnik_URL } from '../app.constants';
import { Radnik } from '../models/radnik';

@Injectable({
  providedIn: 'root'
})
export class RadnikService {

  constructor(private httpClient: HttpClient) { }

  public getRadnikeZaSektor(idSektora: number): Observable<any> {
    return this.httpClient.get(`${RadnikSektor_URL}/${idSektora}`);
  }

  public addRadnik(radnik: Radnik): Observable<any> {
    radnik.id=0;
    return this.httpClient.post(`${Radnik_URL}`, radnik);
  }

  public updateRadnik(radnik: Radnik): Observable<any> {
    return this.httpClient.put(`${RadnikSektor_URL}`, radnik);
  }

  public deleteRadnik(id: number): Observable<any> {
    return this.httpClient.delete(`${RadnikSektor_URL}/${id}`);
  }
}
