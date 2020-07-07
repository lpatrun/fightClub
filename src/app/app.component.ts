import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'fightClub';
  monsters: any = [];
  monsterPairs: Array<string> = [];
  semiFinalsButton: boolean = true;

  halfFinals: any = [];
  halfFinalsPairs: Array<string> = [];
  halfFinalsButton: boolean = false;

  finalsArray: any = [];
  finalsButton: boolean = false;

  finalsResult: any = [];
  finalsResultPair: any = [];

  playAgain: boolean = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.generateEightMonsters();
  }

  generateEightMonsters() {
    for (let i = 0; i < 8; i++) {
      let id = Math.ceil(Math.random() * 731);
      this.http.get(
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

      if (this[sourceContainer][firstHeroIndex].powerstats[ability] === null) {
        heroOneAttack += 0;
      } else {
        heroOneAttack += parseInt(this[sourceContainer][firstHeroIndex].powerstats[ability]);
      }

      if (this[sourceContainer][firstHeroIndex + 1].powerstats[ability] === null) {
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

  generateResults(firstHeroIndex: number, sourceContainer, resultsContainer) {
    let firstHeroWins: number = 0;
    let secondHeroWins: number = 0;
    do {
      this.roundResult(firstHeroIndex, sourceContainer) ? firstHeroWins++ : secondHeroWins++;
    } while (firstHeroWins < 2 && secondHeroWins < 2)

    (firstHeroWins > secondHeroWins) ?
      this[resultsContainer].push(this[sourceContainer][+firstHeroIndex]) :
      this[resultsContainer].push(this[sourceContainer][+firstHeroIndex + 1]);

    return (firstHeroWins + ":" + secondHeroWins);
  }

  toSemiFinals() {
    console.log(this.monsters);
    for (let firstHeroIndex = 0; firstHeroIndex < 4; firstHeroIndex++) {
      let result: string = this.generateResults(firstHeroIndex * 2, "monsters", "halfFinals");
      this.monsterPairs.push(this.monsters[firstHeroIndex * 2].name + " - " + this.monsters[firstHeroIndex * 2 + 1].name + " " + result);
    }
    this.semiFinalsButton = false;
    this.halfFinalsButton = true;
  }

  toHalfFinals() {
    for (let firstHeroIndex = 0; firstHeroIndex < 2; firstHeroIndex++) {
      let result: string = this.generateResults(firstHeroIndex * 2, "halfFinals", "finalsArray");
      this.halfFinalsPairs.push(this.halfFinals[firstHeroIndex * 2].name + " - " + this.halfFinals[firstHeroIndex * 2 + 1].name + " " + result);
    }
    this.halfFinalsButton = false;
    this.finalsButton = true;
  }

  toFinals() {
    let result: string = this.generateResults(0, "finalsArray", "finalsResult");
    this.finalsResultPair.push(this.finalsArray[0].name + " - " + this.finalsArray[1].name + " " + result);
    this.finalsButton = false;
    this.playAgain = true;
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
    this.finalsResultPair = [];
    this.playAgain = false;
    this.generateEightMonsters(); 
  }
}

//https://www.superheroapi.com/api.php/10220957965592385/