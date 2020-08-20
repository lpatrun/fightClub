import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HeroService } from '../hero.service';
import { Hero } from '../hero.model';
import { Resultshero } from '../resultshero.model';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.sass']
})
export class TournamentComponent implements OnInit {
  title = 'fightClub';

  monsters: Hero[] = [];
  halfFinals: Hero[] = [];
  finalsArray: Hero[] = [];
  finalsResult: Hero[] = [];
  semiFinalsHeros: Resultshero[] = [];
  halfFinalsHeros: Resultshero[] = [];
  fullFinalsHeros: Resultshero[] = [];
  
  semiFinalsButton: boolean = true;
  halfFinalsButton: boolean = false;
  finalsButton: boolean = false;
  playAgain: boolean = false;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.heroService.generateEightMonsters();    
    this.heroService.herosChanged
    .subscribe(
      (hero: Hero) => {
        this.monsters.push(hero);
      }
    );
  }

  roundResult(firstHeroIndex: number, sourceContainer) {
    let abilities: Array<string> = ["intelligence", "strength", "speed", "durability", "power", "combat"];
    let heroOneAttack: number = 0;
    let heroTwoAttack: number = 0;
    for (let i = 0; i < 2; i++) {
      let ability: string = abilities[Math.floor(Math.random() * 6)];

      if (this[sourceContainer][firstHeroIndex].powerstats[ability] === "null") {
        heroOneAttack += 0;
      } else {
        heroOneAttack += parseInt(this[sourceContainer][firstHeroIndex].powerstats[ability]);
      }

      if (this[sourceContainer][firstHeroIndex + 1].powerstats[ability] === "null") {
        heroTwoAttack += 0;
      } else {
        heroTwoAttack += parseInt(this[sourceContainer][firstHeroIndex + 1].powerstats[ability]);
      }
    }

    if (heroOneAttack === heroTwoAttack) {
      return true;
    } else {
      return heroOneAttack > heroTwoAttack ? true : false;
    }
  }

  generateResults(firstHeroIndex: number, sourceContainer: string, resultsContainer: string, tournamentStage: string): void  {
    let firstHeroWins: number = 0;
    let secondHeroWins: number = 0;
    do {
      this.roundResult(firstHeroIndex, sourceContainer) ? firstHeroWins++ : secondHeroWins++;
    } while (firstHeroWins < 2 && secondHeroWins < 2)

    (firstHeroWins > secondHeroWins) ?
      this[resultsContainer].push(this[sourceContainer][+firstHeroIndex]) :
      this[resultsContainer].push(this[sourceContainer][+firstHeroIndex + 1]);

    this[sourceContainer][firstHeroIndex][tournamentStage] = firstHeroWins;
    if (firstHeroWins == 2) {
      this[sourceContainer][firstHeroIndex].color = 'green';
    } else {
      this[sourceContainer][firstHeroIndex].color = 'red';
    }

    this[sourceContainer][firstHeroIndex + 1][tournamentStage] = secondHeroWins;
    if (secondHeroWins == 2) {
      this[sourceContainer][firstHeroIndex + 1].color = 'green';
    } else {
      this[sourceContainer][firstHeroIndex + 1].color = 'red';
    }

    const heroPairContainer = this.toChangeTournamentStage(tournamentStage);
    this.toFillContainers (sourceContainer, heroPairContainer, firstHeroIndex, firstHeroWins, secondHeroWins);
  }

  toChangeTournamentStage (tournamentStage: string) {
    switch (tournamentStage) {
      case "semiFinals":
        return "semiFinalsHeros"
      case "halfFinals":
        return "halfFinalsHeros"
      case "endFinals":
        return "fullFinalsHeros"
      default:
        return "semiFinalsHeros"
    }
  }

  toFillContainers (sourceContainer: string, heroPairContainer: string, firstHeroIndex: number, firstHeroWins, secondHeroWins) {
    this[heroPairContainer].push({
      "heroOne": this[sourceContainer][firstHeroIndex].name,
      "resultOne": firstHeroWins,
      "imageOne": this[sourceContainer][firstHeroIndex].image.url,
      "heroTwo": this[sourceContainer][firstHeroIndex + 1].name,
      "resultTwo": secondHeroWins,
      "imageTwo": this[sourceContainer][firstHeroIndex + 1].image.url
    });
  }

  toSemiFinals() {
    for (let firstHeroIndex = 0; firstHeroIndex < 4; firstHeroIndex++) {
      this.generateResults(firstHeroIndex * 2, "monsters", "halfFinals", "semiFinals");
    }

    this.semiFinalsButton = false;
    this.halfFinalsButton = true;
  }

  toHalfFinals() {
    for (let firstHeroIndex = 0; firstHeroIndex < 2; firstHeroIndex++) {
      this.generateResults(firstHeroIndex * 2, "halfFinals", "finalsArray", "halfFinals");
    }

    this.halfFinalsButton = false;
    this.finalsButton = true;
  }

  toFinals() {
    this.generateResults(0, "finalsArray", "finalsResult", "endFinals");
    this.finalsButton = false;
    this.playAgain = true;
  }

  toNewTournament() {
    this.monsters = [];
    this.halfFinals = [];
    this.finalsArray = [];
    this.finalsResult = [];
    this.semiFinalsHeros = [];
    this.halfFinalsHeros = [];
    this.fullFinalsHeros = [];
    this.semiFinalsButton = true;
    this.halfFinalsButton = false;
    this.finalsButton = false;
    this.playAgain = false;
    this.heroService.generateEightMonsters();
    this.router.navigate(['../heroes'], { relativeTo: this.route });
  }
}
