import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent implements OnInit {

  @Input()
  public currGif!: Gif;

  //* On initilization we will check if there are gifs or not
  ngOnInit(): void {
    if (!this.currGif) throw new Error("Gif property required.")
  }

}
