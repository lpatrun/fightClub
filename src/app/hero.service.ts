import { Hero } from './hero.model';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export class HeroService implements OnInit {
  private heros: Hero[] = [];
  herosChanged = new Subject<Hero>();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  generateEightMonsters() {
    this.heros = [];
    for (let i = 0; i < 8; i++) {
      let id = Math.ceil(Math.random() * 731);
      this.http.get<Hero>(
        'https://www.superheroapi.com/api.php/10220957965592385/' + id
      ).subscribe(fetchedPosts => {
        this.herosChanged.next(fetchedPosts);
        this.heros.push(fetchedPosts);
      });
    }
  }

  getHero(index: number) {
    return this.heros[index];
  }
}