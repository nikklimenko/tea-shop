import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  @ViewChild('content') private content!: ElementRef;

  private observable: Observable<any>;
  private subscription: Subscription | null = null;

  constructor(private modalService: NgbModal) {
    this.observable = new Observable((observer) => {
      const timerModal = setTimeout(() => this.openMainModal(), 10000);
      return {
        unsubscribe() {
          clearTimeout(timerModal);
        }
      }
    })
  }

  ngOnInit() {
    this.subscription = this.observable.subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openMainModal() {
    this.modalService.open(this.content, { centered: true });
  }

}
