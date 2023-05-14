import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaxStrLengthPipe} from "./pipes/max-str-length.pipe";
import {SearchComponent} from "./components/search/search.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MaxStrLengthPipe,
    SearchComponent,
    ProductCardComponent,

  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MaxStrLengthPipe,
    SearchComponent,
    ProductCardComponent,
  ]
})
export class SharedModule { }
