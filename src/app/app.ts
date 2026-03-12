import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Weather } from './Core/Services/Weather/weather';
import { WeatherData } from './Core/Services/Weather/weather.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly weather = inject(Weather);
  city: WritableSignal<string> = signal<string>('');
  data: WritableSignal<WeatherData> = signal<WeatherData>({} as WeatherData);
  value: string = '';
  ngOnInit(): void {
    this.getWeather('cairo');
    this.getLocation();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        if (position.coords.latitude || position.coords.longitude) {
          this.weather
            .getLocation(position.coords.latitude, position.coords.longitude)
            .subscribe((res) => {
              if (res.status.message == 'OK') {
                this.getWeather(res.results[0].components.city);
              }
            });
        } else {
          this.getWeather('egypt');
        }
      });
    }
  }
  getWeather(city: string) {
    this.weather.getWeather(city).subscribe({
      next: (res) => {
        this.data.set(res);
      },
    });
  }
  Search() {}
}
