import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private readonly http = inject(HttpClient);
  getWeather(city: string): Observable<any> {
    return this.http.get(
      `https://api.weatherapi.com/v1/current.json?key=d0e0330cbd624226ad1154926262402&q=${city}`,
    );
  }
  getLocation(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lon}&key=95433b5bafe04aae9faf7d8f2a45049e`,
    );
  }
}
