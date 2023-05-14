import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerms: Subject<string> = new Subject<string>();
  constructor() {}

  setSearch(term: string) {
    this.searchTerms.next(term);
  }

  clearSearch() {
    this.searchTerms.next('');
  }

}


