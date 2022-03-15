import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { StarShip } from '../models/starship.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getDataSet(dataType:string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://swapi.dev/api/'+ dataType);
  }

  getSpaceshipSingleRecord(id:number): Observable<StarShip> {
    return this.http.get<StarShip>('https://swapi.dev/api/starships/'+ id);
  }

  filterDataResults(dataArray: any, value: string) {

    const reg = new RegExp(value, 'i');
    let filteredResults = dataArray.filter((item) => {
      let flag = false;
      for (const prop in item) {
        if (reg.test(item[prop])) {
          flag = true;
        }
      }

      return flag;
    });

    return filteredResults;
  }
}
