import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { faChartBar, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnChanges {
  faChartBar = faChartBar;
  @Input() ListNombres: Label[] ;
  @Input() ListCantidades: number[] = [];
  // Bar
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  barChartLabels = this.ListNombres;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [
    { data: this.ListCantidades, label: 'Cantidades' },
  ];
  constructor() {
    this.randomize();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ListNombres){
        this.randomize();
    }
  }

  ngOnInit(): void {
    this.randomize();
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

  public async randomize(): Promise<void> {
    // Only Change 3 values
    this.barChartLabels = this.ListNombres;
    this.barChartData = [{ data: this.ListCantidades, label: 'Cantidades' }];
  }
}
