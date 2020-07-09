import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-single-hero',
  templateUrl: './single-hero.component.html',
  styleUrls: ['./single-hero.component.sass']
})
export class SingleHeroComponent implements OnInit {
  id: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
  }

}
