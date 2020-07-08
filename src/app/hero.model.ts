import { Powerstats } from './powerstats.model';
import { Image } from './image.model';

export class Hero {
  public response: string;
  public id: string;
  public name: string;
  public powerstats: Powerstats;
  public image: Image; 
  public semiFinals: string;
  public halfFinals: string;
  public endFinals: string;
  public color: string;

  constructor(response: string, id: string, name: string, powerstats: Powerstats, image: Image) {
    this.response = response;
    this.id = id;
    this.name = name;
    this.powerstats = powerstats;
    this.image = image;
  }
}