import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preduzece_URL } from '../app.constants';
import { Preduzece } from '../models/preduzece';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private httpClient: HttpClient) { }

  public getAllPreduzeca(): Observable<any> {
    return this.httpClient.get(`${Preduzece_URL}`);
  }

  public addPreduzece(preduzece: Preduzece): Observable<any> {
    preduzece.id=0;
    return this.httpClient.post(`${Preduzece_URL}`, preduzece);
  }

  public updatePreduzece(preduzece: Preduzece): Observable<any> {
    return this.httpClient.put(`${Preduzece_URL}`, preduzece);
  }

  public deletePreduzece(id: number): Observable<any> {
    return this.httpClient.delete(`${Preduzece_URL}/${id}`);
  }

}
