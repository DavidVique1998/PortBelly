import { Component, OnInit } from '@angular/core';
import { PestadosProductosPorCategoriaResult } from '../../models/pestados-productos-por-categoria-result';
import { PestadosProductosPorPromocionResult } from '../../models/pestados-productos-por-promocion-result';
import { InformeService } from '../../service/informe.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {
  pCategorias: Array<PestadosProductosPorCategoriaResult> = [];
  pPromociones: Array<PestadosProductosPorPromocionResult> = [];
  pCategoriasListNombres: Label[] = [];
  pCategoriasListCantidad: number[] = [];
  pPromocionesListNombres: Label[];
  pPromocionesListCantidad: Data;
  estadoCategoria = 'Pendiente';
  estadoPromocion = 'Pendiente';
  constructor( private informeService: InformeService) { }

  ngOnInit(): void {
    this.getPCategorias();
    this.getPPromociones();
  }
   async getPCategorias(): Promise<void>{
    this.pCategorias = [];
    this.informeService.getCategorias(this.estadoCategoria).subscribe(result => {
      this.pCategorias = result;
      console.log(result);
      this.getListPCategorias();
    }, error => {
      console.log(error);
    });
  }
  async getPPromociones(): Promise<void>{
    this.pPromociones = [];
    this.informeService.getPromociones(this.estadoPromocion).subscribe(result => {
      this.pPromociones = result;
      this.getListPPromociones();
    }, error => {
      console.log(error);
    });
  }

  getListPCategorias(): void{
    this.pCategoriasListNombres = [];
    this.pCategoriasListCantidad = [];
    this.pCategorias.forEach(element => {
      this.pCategoriasListNombres.push(element.cat_nom);
      this.pCategoriasListCantidad.push(element.cantidad);
    });
  }
  getListPPromociones(): void{
    this.pPromocionesListNombres = [];
    this.pPromocionesListCantidad = [];
    this.pPromociones.forEach(element => {
      this.pPromocionesListNombres.push(element.prm_nom);
      this.pPromocionesListCantidad.push(element.cantidad);
    });
  }
}

