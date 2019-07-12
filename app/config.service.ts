import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:4000';
  headers_ = new HttpHeaders().set("Login-Header", "Enter the Value Here");

  getCharacteres() {
    return this.http.get(`{this.url}/characters`);
  }
}

export interface Characters {
  id: Number;
  name: String;
  age: Number;
}
