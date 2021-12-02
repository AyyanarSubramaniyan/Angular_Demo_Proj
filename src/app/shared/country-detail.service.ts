import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CountryDetail } from './country-detail.model';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailService {
  list: CountryDetail[];
  readonly baseURL = 'https://localhost:44384/api/Country'

  constructor(private http: HttpClient) { }

  postCountryDetail(countryDetail:CountryDetail) { 
    return this.http.post(this.baseURL, countryDetail);
  }
  updateCountryDetail(countryDetail:CountryDetail,id:number){
    return this.http.put(`${this.baseURL}/${id}`, countryDetail);
  }
  deleteCountryDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as CountryDetail[]);
  }
}
