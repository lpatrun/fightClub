import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Hero } from '../hero.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-hero',
  templateUrl: './single-hero.component.html',
  styleUrls: ['./single-hero.component.sass']
})
export class SingleHeroComponent implements OnInit, OnDestroy {
  id: number;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
