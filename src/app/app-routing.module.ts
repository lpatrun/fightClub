import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleHeroComponent } from './single-hero/single-hero.component';
import { TournamentComponent } from './tournament/tournament.component';
import { StartHeroComponent } from './start-hero/start-hero.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  {
    path: 'heroes', component: TournamentComponent, children: [
      { path: '', component: StartHeroComponent },
      { path: ':id', component: SingleHeroComponent }
    ]
  },
  { path: 'test', component: SingleHeroComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}