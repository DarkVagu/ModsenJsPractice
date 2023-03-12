import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private params = 'windSpeed,airTemperature,humidity'

  geStormglasstWeather(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=${this.params}`,
      {
        headers: {
          'Authorization': '19dbcce2-ae2c-11ed-b59d-0242ac130002-19dbcd64-ae2c-11ed-b59d-0242ac130002'
        }
      }
    )
  }

  getOpenWeatherMap(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=10241e2d22b6e42e2776e9b3c3ca8355`)
  }
}
