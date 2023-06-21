import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl:   string = "https://api.giphy.com/v1/gifs";
  private apiKey:       string = "9TYMyM347cDgSO5VUl5ia8CbHUw49Fob";

  constructor( private http: HttpClient ) {
    //* On the injection of this service (refresh) we load if there is, the sidebar history
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  //* Adds/modifies as necessary the history with the inputed tag
  private historyOrganizer(tag: string): void {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes(tag) )
      this._tagsHistory =  this._tagsHistory.filter((oldTag) => oldTag !== tag)

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10)
    this.saveToLocalStorage();
  }

  //* Saves history to the web Local Storage
  private saveToLocalStorage(): void {
    localStorage.setItem("history", JSON.stringify(this._tagsHistory));
  }

  //* Load previous sidebar history in refresh
  private loadLocalStorage(): void {
    if (!localStorage.getItem("history")) return;

    //* Non null operator because we already checked there is a history above
    this._tagsHistory = JSON.parse(localStorage.getItem("history")!);

    //* Load previous gifs if there are as well
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }

  //* Searchs the tag on the API to get the gifs
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.historyOrganizer(tag);

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "16")
      .set("q", tag)

    //* get is a genereic so we can tell it what it's gonna return via "<>"
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe(response => {
        //* We use gifsList on card.html to print the gifs
        this.gifsList = response.data;
        // console.log(response);
      });
  }

}
