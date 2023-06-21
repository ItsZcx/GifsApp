import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h2>Search<\h2>
    <input type="text"
      class="form-control my-2"
      placeholder="Search gifs..."
      (keyup.enter)="searchTag()"
      #searchBoxInput
    >
  `
})
export class SearchBoxComponent {

  @ViewChild("searchBoxInput")
  public boxInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  searchTag(): void {
    const newTag = this.boxInput.nativeElement.value
    this.gifsService.searchTag(newTag)
    this.boxInput.nativeElement.value = ""
  }

}
