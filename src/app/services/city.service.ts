import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}
  cityName: string = '';
  getCity(title: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${title}&limit=5&appid=10241e2d22b6e42e2776e9b3c3ca8355`
    );
  }

  getCityName(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
    );
  }
}
