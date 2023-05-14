import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  product: ProductType | undefined;
  loading: boolean = false;


  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.loading = true;
        this.productService.getProducts()
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data) => {
              this.product = data.find(item => (item.id === +params['id']));
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }
    })
  }

}
