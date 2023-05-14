import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../shared/services/order.service";
import {OrderFormType} from "../../../types/order-form.type";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{
  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
    zip: ['', [Validators.required, Validators.pattern('^\\d{3,10}$')]],
    product: [{value: '', disabled: true}],
    address: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я0-9\\s\\-\\/]+$')]],
    comment: [''],
  })

  private subscriptionProductTitle: Subscription | null = null;
  loading: boolean = false;
  isCreatedOrder: boolean = false;
  isCreatedOrderError: boolean = false;

  constructor(private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private http: HttpClient,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.subscriptionProductTitle = this.activateRoute.queryParams.subscribe((param) => {
      if(param['product']){
        this.orderForm.patchValue({
          product: param['product'],
        });
      }
    });

  }

  ngOnDestroy() {
    this.subscriptionProductTitle?.unsubscribe();
  }

  createOrder(){
    this.orderForm.markAllAsTouched();
    if(this.orderForm.invalid) return;
    this.loading = true;
    const data: OrderFormType =
      {
        name: this.orderForm.get('name')!.value as string,
        last_name: this.orderForm.get('last_name')?.value as string,
        phone: this.orderForm.get('phone')?.value as string,
        country: this.orderForm.get('country')?.value as string,
        zip: this.orderForm.get('zip')?.value as string,
        product: this.orderForm.get('product')?.value as string,
        address: this.orderForm.get('address')?.value as string,
        comment: this.orderForm.get('comment')?.value as string,
      };

    this.orderService.createOrder(data)
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(response => {
        if(response.success && !response.message){
          this.isCreatedOrder = true;
        }else{
          this.isCreatedOrderError = true;
          setTimeout(() => {
            this.isCreatedOrderError = false;
          }, 3000)
        }
      })
  }

}
