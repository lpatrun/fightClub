import { Component, OnInit, Input } from '@angular/core';
import { Resultshero } from '../resultshero.model';

@Component({
  selector: 'app-hero-pair',
  templateUrl: './hero-pair.component.html',
  styleUrls: ['./hero-pair.component.sass']
})
export class HeroPairComponent implements OnInit {
  @Input() pair: Resultshero;

  constructor() { }

  ngOnInit(): void {
  }

}
