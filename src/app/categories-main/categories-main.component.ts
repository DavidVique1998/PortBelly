import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-categories-main',
  templateUrl: './categories-main.component.html',
  styleUrls: ['./categories-main.component.css']
})
export class CategoriesMainComponent implements OnInit {
  mainCategorias: Categoria;
  mainTitle: string;
  mainReload: boolean;
  constructor() { }

  ngOnInit(): void {
    this.onInit();
  }
  onInit(): void {
    this.mainCategorias = new Categoria();
    this.mainTitle = 'Registro de nueva Categoría';
    this.mainReload = false;
  }

  toUpdate($event): void{
    this.mainCategorias = $event;
    this.mainCategorias.cat_nom;
    console.log(this.mainCategorias);
    this.mainTitle = 'Editando categoría ' + $event.cat_nom ;
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
