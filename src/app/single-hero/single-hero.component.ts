import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-single-hero',
  templateUrl: './single-hero.component.html',
  styleUrls: ['./single-hero.component.sass']
})
export class SingleHeroComponent implements OnInit {
  id: number;
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.hero = this.heroService.getHero(this.id);
        if(!this.hero) {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
