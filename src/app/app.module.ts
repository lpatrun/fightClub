import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleHeroComponent } from './single-hero/single-hero.component';
import { AppRoutingModule } from './app-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { StartHeroComponent } from './start-hero/start-hero.component';
import { HeroItemComponent } from './hero-item/hero-item.component';
import { HeroService } from './hero.service';
import { HeroPairComponent } from './hero-pair/hero-pair.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleHeroComponent,
    TournamentComponent,
    StartHeroComponent,
    HeroItemComponent,
    HeroPairComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
