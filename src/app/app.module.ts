import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SingleHeroComponent } from './single-hero/single-hero.component';
import { AppRoutingModule } from './app-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { StartHeroComponent } from './start-hero/start-hero.component';
import { HeroItemComponent } from './hero-item/hero-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleHeroComponent,
    TournamentComponent,
    StartHeroComponent,
    HeroItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
