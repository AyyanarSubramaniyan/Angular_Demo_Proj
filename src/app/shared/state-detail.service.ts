import { Injectable } from '@angular/core';
import { StateDetail } from './state-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StateDetailService {

  readonly baseURL = 'https://localhost:44384/api/State'
  list: StateDetail[]; 

  constructor(private http: HttpClient) { }
  
  postStateDetail(stateDetail:StateDetail) { 
    return this.http.post(this.baseURL, stateDetail);
  }
  updateStateDetail(stateDetail:StateDetail,id:number){
    return this.http.put(`${this.baseURL}/${id}`, stateDetail);
  }
  deleteStateDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as StateDetail[]);
  }
}
