import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { faChartPie} from '@fortawesome/free-solid-svg-icons';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnChanges {
  faChartPie = faChartPie;
  @Input() ListNombres: Label[];
  @Input() ListCantidades: number[];
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  pieChartLabels: Label[] = ['Ventas', 'Pendientes'];
  pieChartData: number[] = [200, 400];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ListNombres){
      this.randomize();
    }
  }

  ngOnInit(): void {
    // this.randomize();
  }
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [
      'hen',
      'variable',
      'embryo',
      'instal',
      'pleasant',
      'physical',
      'bomber',
      'army',
      'add',
      'film',
      'conductor',
      'comfortable',
      'flourish',
      'establish',
      'circumstance',
      'chimney',
      'crack',
      'hall',
      'energy',
      'treat',
      'window',
      'shareholder',
      'division',
      'disk',
      'temptation',
      'chord',
      'left',
      'hospital',
      'beef',
      'patrol',
      'satisfied',
      'academy',
      'acceptance',
      'ivory',
      'aquarium',
      'building',
      'store',
      'replace',
      'language',
      'redeem',
      'honest',
      'intention',
      'silk',
      'opera',
      'sleep',
      'innocent',
      'ignore',
      'suite',
      'applaud',
      'funny',
    ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map((_) =>
      randomWord()
    );
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    // this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    // this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position =
      this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
  public async randomize(): Promise<void> {
    // Only Change 3 values
    this.pieChartLabels = this.ListNombres;
    this.pieChartData = this.ListCantidades;
  }
}
