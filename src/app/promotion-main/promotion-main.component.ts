import { Component, OnInit } from '@angular/core';
import { Promocion } from '../models/promocion';
@Component({
  selector: 'app-promotion-main',
  templateUrl: './promotion-main.component.html',
  styleUrls: ['./promotion-main.component.css']
})
export class PromotionMainComponent implements OnInit {
  mainPromocion: Promocion;
  mainTitle: string;
  mainReload: boolean;
  constructor() { }

  ngOnInit(): void {
    this.onInit();
  }
  onInit(): void {
    this.mainPromocion = new Promocion();
    this.mainTitle = 'Registro de nueva Promoción';
    this.mainReload = false;
  }

  toUpdate($event): void{
    this.mainPromocion = $event;
    console.log(this.mainPromocion);
    this.mainTitle = 'Editando promoción ' + $event.prm_nom ;
  }

  toReload($event): void {
    this.onInit();
    console.log($event);
    this.mainReload = $event;
  }

  reloadDone($event): void{
    this.mainReload = !$event;
  }
}
