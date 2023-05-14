import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: ProductType[] = [];
  isSearchNotResult: boolean = false;
  loading: boolean = false;
  catalogTitle: string = 'Наши чайные коллекции';

  subscriptionActivateRoute: Subscription | null = null;

  constructor(private productService: ProductService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.loading = true;

    this.searchService.searchTerms.subscribe(term => {
      this.catalogTitle =
        term === ''
          ? 'Наши чайные коллекции'
          : `Результаты поиска по запросу: "${term}"`;
    });

    this.activateRoute.queryParams.subscribe(params => {
      this.productService.getProducts()
        .pipe(tap(() => this.loading = false))
        .subscribe(data => {
          if (params['search']) {
            this.products = data.filter(item => (item.title === params['search']));
            this.isSearchNotResult = this.products.length < 1;
          } else {
            if (params['search'] === '') {
              this.router.navigate(['catalog']);
            }
            this.products = data;
          }
        })
    })
  }
}
