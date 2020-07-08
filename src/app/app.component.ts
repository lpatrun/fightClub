import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'fightClub';
  monsters: Hero[] = [];
  monsterPairs: Array<string> = [];
  semiFinalsButton: boolean = true;

  halfFinals: Hero[] = [];
  halfFinalsPairs: Array<string> = [];
  halfFinalsButton: boolean = false;

  finalsArray: Hero[] = [];
  finalsButton: boolean = false;

  finalsResult: Hero[] = [];
  finalsResultPair: string = "";

  playAgain: boolean = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.generateEightMonsters();
  }

  generateEightMonsters() {
    for (let i = 0; i < 8; i++) {
      let id = Math.ceil(Math.random() * 731);
      this.http.get<Hero>(
        'https://www.superheroapi.com/api.php/10220957965592385/' + id
      ).subscribe(fetchedPosts => (
        this.monsters.push(fetchedPosts)
      ));
    }
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

  generateResults(firstHeroIndex: number, sourceContainer, resultsContainer, tournamentStage) {
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

    return (firstHeroWins + ":" + secondHeroWins);
  }

  toSemiFinals() {
    for (let firstHeroIndex = 0; firstHeroIndex < 4; firstHeroIndex++) {
      let result: string = this.generateResults(firstHeroIndex * 2, "monsters", "halfFinals", "semiFinals");
      this.monsterPairs.push(this.monsters[firstHeroIndex * 2].name + " - " + this.monsters[firstHeroIndex * 2 + 1].name + " " + result);
    }
    console.log(this.monsters);
    this.semiFinalsButton = false;
    this.halfFinalsButton = true;

    console.log("*** Četvrtfinale ***");
    for (let i = 0; i < 7; i += 2) {
      console.log(
        `%c${this.monsters[i].name} %c- %c${this.monsters[i + 1].name} %c${this.monsters[i].semiFinals}:${this.monsters[i + 1].semiFinals}`,
        `color: ${this.monsters[i].color}`, "color: black", `color:  ${this.monsters[i + 1].color}`, "color: black");
    }
  }

  toHalfFinals() {
    for (let firstHeroIndex = 0; firstHeroIndex < 2; firstHeroIndex++) {
      let result: string = this.generateResults(firstHeroIndex * 2, "halfFinals", "finalsArray", "halfFinals");
      this.halfFinalsPairs.push(this.halfFinals[firstHeroIndex * 2].name + " - " + this.halfFinals[firstHeroIndex * 2 + 1].name + " " + result);
    }
    this.halfFinalsButton = false;
    this.finalsButton = true;

    console.log("*** Polufinale ***");
    for (let i = 0; i < 4; i += 2) {
      console.log(
        `%c${this.halfFinals[i].name} %c- %c${this.halfFinals[i + 1].name} %c${this.halfFinals[i].halfFinals}:${this.halfFinals[i + 1].halfFinals}`,
        `color: ${this.halfFinals[i].color}`, "color: black", `color:  ${this.halfFinals[i + 1].color}`, "color: black");
    }
  }

  toFinals() {
    let result: string = this.generateResults(0, "finalsArray", "finalsResult", "endFinals");
    this.finalsResultPair = this.finalsArray[0].name + " - " + this.finalsArray[1].name + " " + result;
    this.finalsButton = false;
    this.playAgain = true;

    console.log("*** Finale ***");
    console.log(
      `%c${this.finalsArray[0].name} %c- %c${this.finalsArray[1].name} %c${this.finalsArray[0].endFinals}:${this.finalsArray[1].endFinals}`,
      `color: ${this.finalsArray[0].color}`, "color: black", `color:  ${this.finalsArray[1].color}`, "color: black");

  }

  toNewTournament() {
    this.monsters = [];
    this.monsterPairs = [];
    this.semiFinalsButton = true;
    this.halfFinals = [];
    this.halfFinalsPairs = [];
    this.halfFinalsButton = false;
    this.finalsArray = [];
    this.finalsButton = false;
    this.finalsResult = [];
    this.finalsResultPair = "[]";
    this.playAgain = false;
    this.generateEightMonsters();
  }
}

//https://www.superheroapi.com/api.php/10220957965592385/