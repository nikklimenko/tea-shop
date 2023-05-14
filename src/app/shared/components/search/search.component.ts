import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject
} from "rxjs";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  model: string = '';

  @ViewChild('instance', { static: true }) instance: NgbTypeahead | null = null;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  private productsTitle: string[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          products.forEach(item => this.productsTitle.push(item.title));
        }
      })
  }

  clearSearch(){
    this.searchService.clearSearch();
    this.router.navigate(['catalog']);
  }

  clickSearch(){
    this.searchService.searchTerms.next(this.model);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance?.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === '' ? this.productsTitle : this.productsTitle.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 3),
      ),
    );
  };

}
