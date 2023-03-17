import { CityState } from './city.reducer';
import { WeatherState } from './weather.reducer';

export interface state {
  weather: WeatherState;
  city: CityState;
}
