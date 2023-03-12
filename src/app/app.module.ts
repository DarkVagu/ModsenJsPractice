import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WeatherComponent } from './components/weather/weather.component';
import { SearchComponent } from './components/weather/search/search.component';
import { weatherReducer } from './store/reducers/weather.reducer';
import { WeatherEffects } from './store/effects/weather.effects';
import { CityEffects } from './store/effects/city.effets';
import { cityReducer } from './store/reducers/city.reducer';
import { ShowWeatherComponent } from './components/weather/show-weather/show-weather.component';

const appRoutes: Routes = [
  { path: '', component: WeatherComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SearchComponent,
    ShowWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    StoreModule.forRoot({ weather: weatherReducer, city: cityReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([WeatherEffects, CityEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
