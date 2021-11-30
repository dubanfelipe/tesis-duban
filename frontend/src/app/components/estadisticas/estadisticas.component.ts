import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Estadisticas} from '../../models/Estadisticas';
import { EstadisticasService } from '../../services/estadisticas.service';
import { Chart } from 'chart.js';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BaseChartDirective, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  public dia = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  public mes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  public lineChartData: ChartDataSets[] = [];
  public lineMesChartData: ChartDataSets[] = [];
  public lineChartLabels = []; 
  public lineMesChartLabels = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{gridLines: { display: false },
          scaleLabel: { display: false }, 
          position: 'bottom',
          ticks: {
            fontColor: "white",
          }
        }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: "white",
          }
        },
      ]
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 255, 255)',
      },
      position: 'top'
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  }; 
  public lineMesChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{gridLines: { display: false },
          scaleLabel: { display: false }, 
          position: 'bottom',
          ticks: {
            fontColor: "white",
          }
        }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: "white",
          }
        },
      ]
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 255, 255)',
      },
      position: 'top'
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  }; 
  public lineChartColors: Color[] = [
    {
      borderColor: '#FF8633',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#519E63',                
    },
    {
      borderColor: '#9C9C9C',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#9C9C9C',
    },
    {
      borderColor: '#09A3AE',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#09A3AE', 
    },
  ];
  public lineMesChartColors: Color[] = [
    {
      borderColor: '#FF8633',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#519E63',                
    },
    {
      borderColor: '#9C9C9C',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#9C9C9C',
    },
    {
      borderColor: '#09A3AE',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#09A3AE', 
    },
  ];
  public lineChartLegend = true; 
  public lineMesChartLegend = true; 
  public lineChartType: ChartType = 'line';
  public lineMesChartType: ChartType = 'line';
  rsoRecord;
  rsoRecordRso;
  diaForm: FormGroup;
  mesForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, public estadisticasService : EstadisticasService) {
    this.buildForm();
  }

  get diaLetra() {
    return this.diaForm.get("diaLetra");
  }

  get mesLetra() {
    return this.mesForm.get("mesLetra");
  }
  buildForm() {
    this.diaForm = this.fb.group({
      diaLetra: ['Lunes', Validators.compose([Validators.required])],
    });
    this.mesForm = this.fb.group({
      mesLetra: ['November', Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
    let diaLetra = "Martes";
    let mesLetra = "November"
    this.estadisticasService.getEstadisticas(diaLetra)
    .subscribe(records =>{      
      this.rsoRecord = records;
      this.createGraficaLine(this.rsoRecord);
    })
    this.estadisticasService.getEstadisticasMes(mesLetra)
    .subscribe(recordss =>{
      this.rsoRecordRso = recordss;
      this.createGraficaLineMes(this.rsoRecordRso);
    })
  }

  createGraficaLine(rsoRecord): void {
    const _lineChartLabels: Array<any> = new Array(rsoRecord);
    const _lineChartCant01: Array<any> = new Array(this.lineChartData);
    const _lineChartCant02: Array<any> = new Array(this.lineChartData);
    const _lineChartCant03: Array<any> = new Array(this.lineChartData);
    for (let i = 0; i < rsoRecord.length; i++ ) {
      _lineChartCant01[i] = rsoRecord[i].cant01;
      _lineChartCant02[i] = rsoRecord[i].cant02;
      _lineChartCant03[i] = rsoRecord[i].cant03;
      _lineChartLabels[i] = rsoRecord[i].hora + "hr";
      this.lineChartLabels.push(rsoRecord[i].hora + "hr");
    }
    this.lineChartLabels = _lineChartLabels;
    this.lineChartData = [
      { data: _lineChartCant01, label: 'Sede principal', stack: 'a' },
      { data: _lineChartCant02, label: 'Edificio Dr Angelico' },
      { data: _lineChartCant03, label: 'Campus San Alberto Magno' },
    ]; 
  }
  createGraficaLineMes(rsoRecord): void{
    const _lineChartLabels: Array<any> = new Array(rsoRecord);
    const _lineChartCant01: Array<any> = new Array(this.lineMesChartData);
    const _lineChartCant02: Array<any> = new Array(this.lineMesChartData);
    const _lineChartCant03: Array<any> = new Array(this.lineMesChartData);
    for (let i = 0; i < rsoRecord.length; i++ ) {
      _lineChartCant01[i] = rsoRecord[i].cant01;
      _lineChartCant02[i] = rsoRecord[i].cant02;
      _lineChartCant03[i] = rsoRecord[i].cant03;
      _lineChartLabels[i] = rsoRecord[i].diaNumero + "día";
      this.lineMesChartLabels.push(rsoRecord[i].diaNumero + "día");
    }
    this.lineMesChartLabels = _lineChartLabels;
    this.lineMesChartData = [
      { data: _lineChartCant01, label: 'Sede principal', stack: 'a' },
      { data: _lineChartCant02, label: 'Edificio Dr Angelico' },
      { data: _lineChartCant03, label: 'Campus San Alberto Magno' },
    ]; 
  }

  DiaSelected(Form){
    this.estadisticasService.getEstadisticas(Form.value.diaLetra)
    .subscribe(records =>{      
      this.rsoRecord = records;
      this.createGraficaLine(this.rsoRecord);
    })
  }

  MesSelected(Form){
    console.log(Form.value.mesLetra);
    this.estadisticasService.getEstadisticasMes(Form.value.mesLetra)
    .subscribe(records =>{      
      this.rsoRecordRso = records;
      this.createGraficaLineMes(this.rsoRecordRso);
    })
  }

}
