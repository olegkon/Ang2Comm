// import './polyfills.ts';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AgGridNg2 } from 'ag-grid-angular/main';
import { GridOptions } from 'ag-grid/main';
import { AgGridModule } from 'ag-grid-angular/main';

import * as _ from 'lodash';

// import {MomentModule} from 'angular2-moment/moment.module';  // for Date processing
// import * as moment_ from 'moment';
import * as moment from 'moment';
// import Moment from 'moment';

import {SelectItem, DataGrid, Panel} from 'primeng/primeng';  // DataTable, DataGrid, Column, Chart, Panel
// import {PrimeNGComponent} from "./components/primeng";
import {DropdownModule,  SharedModule, DataGridModule, PanelModule, TabViewModule } from 'primeng/primeng';

// import { Highcharts }            from 'highcharts/higcharts';
// import { Highcharts } from 'angular2-highcharts'; // CHART_DIRECTIVES,
import { ChartModule }            from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdToolbarModule, MdCheckboxModule, MdButtonModule, MdMenuModule, MdTabsModule } from '@angular/material';

// import { ProductService } from './product-service';
import { PortfolioService } from './app/service/portfolio-service';
import { PortfolioCompositionService } from './app/service/portfolioComposition-service';
import { SectorService } from './app/service/sector-service';
import { ScenarioService } from './app/service/scenario-service';
import { GraphService } from './app/service/graph-service';
import { CreditSummaryService } from './app/service/creditSummary-service';
import { LoanService } from './app/service/loan-service';

import { Portfolio } from './app/vo/portfolio';
import { Sector } from './app/vo/sector';
import { Scenario } from './app/vo/scenario';
import { GraphData } from './app/vo/graphData';
import { MCData } from './app/vo/mcData';
import { PortfolioComposition} from './app/vo/portfolioComposition';
import { CreditSummary } from './app/vo/creditSummary';
import { Loan } from './app/vo/loan';

//import {userInfo} from 'os';
export declare let require : any;


@Component({
  selector: 'app-root',
  providers: [ PortfolioService, SectorService, ScenarioService, GraphService, PortfolioCompositionService, CreditSummaryService, LoanService ],
  template: `
  <div class="wrapper"> 
      <header class="header">
        
        <!-- img src="/src/images/main_logo.png" /-->
        <!-- div class="float-right">Menu</div -->
        
        <!-- md-toolbar color="grey">
          <img src="/src/images/main_logo.png"/>        
          <span class="example-fill-remaining-space"></span>          
          <button md-icon-button [md-menu-trigger-for]="menu">
            <md-icon>more_vert</md-icon>
          </button>
        </md-toolbar>
        <md-menu x-position="before" #menu="mdMenu">
          <button md-menu-item>Option 1</button>
          <button md-menu-item>Option 2</button>
        </md-menu -->
        <!-- md-tab-group>
          <md-tab label="Portfolios">
            <h1>Tab content1</h1>            
          </md-tab>
          <md-tab label="Single loan">
            <h1>Some other tab content2</h1>           
          </md-tab>
        </md-tab-group -->
        
        <p-tabView>
          <p-tabPanel header="Portfolio Analysis" [selected]="true">
            Content 1
          </p-tabPanel>
          <p-tabPanel header="Surveillance">
              Content 2
          </p-tabPanel>
          <p-tabPanel header="Single Loan Calculator">
              Content 3 
          </p-tabPanel>
        </p-tabView>  
              
      </header><!-- .header-->    
    
      <div class="middle">
          <div class="container"> 
              
              <main class="content">
                    
                  <span class="container-component">
                      <h2>Portfolio Composition</h2>
                      <p-dataGrid id="grid-portfolio-composition" [value]="arr" [paginator]="true" [rows]="1">
                          <ng-template let-pcRow>
                              <div class="divTable">
                                  <div class="divRow" *ngFor="let col of cols; let i=index" >
                                      <span class="divCell align-left"><b>{{col.header}}</b></span>
                                      <span class="divCell align-right">{{portfolioComposition[col.field]}}</span>
                                  </div>
                              </div>
                          </ng-template>
                      </p-dataGrid>
                  </span>

                  <span class="container-component">
                      <h2>1 Year Base Case Summary</h2>
                      <ag-grid-angular id="grid-year-summary" class="ag-fresh" [gridOptions]="gridOptions1YSumm"></ag-grid-angular>
                  </span>

                  <span class="container-component" id="container-graph">
                      <h2 id="graphTitle" class="no-bg display-inline-block">Probability of Default over time:</h2>
                      <span id="link-Scenorio-Dist"> <button class="header-selected" (click)="onGraphChange($event);">Scenario Comparison</button></span>
                      <span id="link-MonteCarlo-Dist"> >> <button (click)="onGraphChange($event);">Monte Carlo Distribution</button></span>
                      <span id="link-EndOfLife-Dist"> >> <button (click)="onGraphChange($event);">End of Life Distribution</button></span>
                    
                      <chart id="linechart"  (load)="saveChart($event.context)" [options]="optionsDflt" ></chart>  
                  </span>

                  <span class="container-component" id="container-credit-summary">
                      <div class="no-bg">
                          <h2 id="summCreditTitle" class="no-bg display-inline-block">Summary Credit Measures</h2>    
                          <span class="float-right" id="summCreditBtns">
                              <button id="button-term-1Y" class="header-selected" (click)="onTermChange($event);">1Y</button>
                              <button id="button-term-2Y" (click)="onTermChange($event);">2Y</button>
                              <button id="button-term-9Q" (click)="onTermChange($event);">9Q</button>
                              <button id="button-term-13Q" (click)="onTermChange($event);">13Q</button>
                              <button id="button-term-5Y" (click)="onTermChange($event);">5Y</button>
                              <button id="button-term-10Y" (click)="onTermChange($event);">10Y</button>
                              <button id="button-term-20Y" (click)="onTermChange($event);">20Y</button>
                              <button id="button-term-30Y" (click)="onTermChange($event);">30Y</button>   
                          </span>
                      </div>    
                      
                      <ag-grid-angular id="grid-credit-summary" class="ag-fresh" [gridOptions]="gridOptionsSumm" (cellDoubleClicked)="onCellDoubleClicked($event)">
                  </ag-grid-angular>
                  </span>

                  <span class="container-component" id="container-top10">
                      <h2 class="no-bg">Top 10 loans by lifetime Probability of Default</h2>
                      <ag-grid-angular id="grid-loans" class="ag-fresh" [gridOptions]="gridOptionsLoans">
                  </ag-grid-angular>
                  </span>
              </main><!-- .content -->
 
          </div><!-- .container-->
          <aside class="left-sidebar">

              <h1>Get Portfolios using PortfolioService (for user)</h1>
              <form #f="ngForm" (ngSubmit) = "getPortfolios(f.value)" >
                  <label for="userID">Enter User ID</label>
                  <input id="userID" type="string" name="userID" ngModel>
                  <button type="submit">Get Portfolios</button>
              </form>

              <br/>

              <h2>Portfolio Selection</h2>   <!-- was: width:880px" -->
              <ag-grid-angular id="grid-portfolio-selection" class="ag-fresh" [gridOptions]="gridOptions" (selectionChanged)="onPortfolioSelectionChanged()">
              </ag-grid-angular>

              <br/>
              <h3 id="container-header-scenarios"><span id="container-text-scenarios">Scenario: </span><p-dropdown id="dropdown-scenarios" [options]="scenarioDP" [(ngModel)]="selectedScenario" [style]="{'width':'150px'}" (ngModelChange)="onSelectedScenarioChanged($event, value)"></p-dropdown> </h3>
 
              <h2>Sector Selection</h2>
              <ag-grid-angular id="grid-sector-selection" class="ag-fresh" [gridOptions]="gridOptions1" (selectionChanged)="onSectorSelectionChanged()">
              </ag-grid-angular>
              
          </aside><!-- .left-sidebar -->
      </div><!-- .middle-->

      <footer class="footer">
          Copyright © 2017 Reis, Inc. All rights reserved.
      </footer><!-- .footer -->

  </div><!-- .wrapper -->  
  `
  // , directives: [	//DataGrid, Panel       //,DataTable, Column, Chart   //, TabPanel, TabView, Header, Footer, Dialog, Button, InputText ]
})

export class AppComponent {

  // (ag-) grids data
  private gridOptions: GridOptions;  // portfolio grid data
  private gridOptions1: GridOptions; // sector grid data
  private gridOptions1YSumm: GridOptions; // credit 1 yr summary grid data
  private gridOptionsSumm: GridOptions; // credit summary grid data
  private gridOptionsLoans: GridOptions; // credit summary grid data

  private columnDefsMC:  any;
  private columnDefsSumm: any;

  // selected values
  private userId: string;
  private sector = 'All';  // OK: is it real default?
  private portfolioName: string;
  private shared: string;    // sharedPortfolio : number;
  private baseDate: string;
  private term = '1Y';  // selected term (in quarters or years)
  private graphMode = 'Scenario Comparison';
  private selectedCol = 'pd';  // selected Summary grid column (used as graph input param)
  private scenario = '1';
  private scenarioName = 'REIS Baseline';
  private interval = 'quarter';  // dflt

  portfolios: Array<Portfolio>;
  sectors: Array<Sector>;
  scenarios: Array<Scenario>;
  portfolioComposition: PortfolioComposition; // Object;
  summary1Y: Array<CreditSummary>;
  summary: Array<CreditSummary>;
  loans: Array<Loan>;

  arr: Array<PortfolioComposition> = []; // Portfolio Composition data
  cols: any[];

  scenarioDP: SelectItem[];   // scenario dropdown DataProvider
  selectedScenario: string;


  // Highcharts options
  optionsDflt: any;    // for default (Summary) HighCharts graph
  optionsMC: any;  // for MonteCarlo graph

  chart1: any; // Object;

  onPointSelect(e) {
    // this.point = e.context.y;
  }

  saveChart(chart) {
    this.chart1 = chart;
    // this.chart1.setOptions(this.optionsDflt);
  }


  constructor(private portfolioService: PortfolioService, private scenarioService: ScenarioService, private sectorService: SectorService,
              private graphService: GraphService, private portfolioCompositionService: PortfolioCompositionService,
              private creditSummaryService: CreditSummaryService, private loanService: LoanService) {

    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowData = []; // 'undefined'];
    this.gridOptions.rowSelection = 'single';
    // this.gridOptions.columnDefs = this.columnDefs;

    this.gridOptions1 = <GridOptions>{};
    this.gridOptions1.rowData = []; // 'undefined'];
    this.gridOptions1.rowSelection = 'single';
    // this.gridOptions1.columnDefs = this.columnDefs1;

    this.gridOptions1YSumm = <GridOptions>{};
    this.gridOptions1YSumm.rowData = []; // 'undefined'];
    this.gridOptions1YSumm.rowSelection = 'single';
    // this.gridOptions1YSumm.columnDefs = this.columnDefs1YSumm;

    this.gridOptionsSumm = <GridOptions>{};
    this.gridOptionsSumm.rowData = []; // 'undefined'];
    this.gridOptionsSumm.rowSelection = 'single';
    // this.gridOptionsSumm.columnDefs = this.columnDefsSumm;

    this.gridOptionsLoans = <GridOptions>{};
    this.gridOptionsLoans.rowData = []; // 'undefined'];
    this.gridOptionsLoans.rowSelection = 'single';
    // this.gridOptionsLoans.columnDefs = this.columnDefsLoans;

    this.scenarioDP = [];   // scenarios dropdown
    // this.scenarioDP.push({label:'Select Scenario', value:null});


    // regular (Scenarios summary) Graph.  build Graph data http://api.highcharts.com/highcharts/chart.backgroundColor
    this.optionsDflt = {
      title: {text: ''},
      // yAxis : [{ isDirty: false}],
      xAxis: {
        categories: [],
        title: {text: 'Month'}, // 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        tickInterval: 1,
        breaks: [{
          breakSize: 1,
          repeat: 1
        }]
      },
      yAxis: {
        title: {text: 'Probability of Default (%)'}, labels: {format: '{value}%'},
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
          tickInterval: 1,
          breaks: [{
            from: 4,
            to: 40,
            breakSize: 2,
            repeat: 2
          }]
        }]
      },
      tooltip: {
        valueSuffix: '%'
      },
      chart: {
        zoomType: 'x',
        plotBorderWidth: 1,
        marginRight: 5,
        marginLeft: 70,
        marginBottom: 115,
        backgroundColor: '#f6f6f6'
      },
      series: [
        {
          name: 'REIS Baseline',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: 'REIS Adverse',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: 'REIS Severe',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: 'CCAR Baseline',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: 'CCAR Adverse',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: 'CCAR Severe',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        }
      ]
    };  // options Dflt


    // MonteCarlo graph.  Build Graph data http://api.highcharts.com/highcharts/chart.backgroundColor
    this.optionsMC = {
      title: {text: ''},
      // yAxis : [{ isDirty: false}],
      xAxis: {
        categories: [],
        title: {text: 'Month'},
        tickInterval: 1,
        breaks: [{
          breakSize: 1,
          repeat: 1
        }]
      },
      yAxis: {
        title: {text: 'Probability of Default (%)'}, labels: {format: '{value}%'},
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
          tickInterval: 1,
          breaks: [{
            from: 4,
            to: 40,
            breakSize: 2,
            repeat: 2
          }]
        }]
      },
      tooltip: {
        valueSuffix: '%'
      },
      chart: {
        zoomType: 'x',
        plotBorderWidth: 1,
        marginRight: 5,
        marginLeft: 70,
        marginBottom: 115,
        backgroundColor: '#f6f6f6'
      },
      series: [
        {
          name: '5th percentile',
          description: '5.000',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: 'Base',
          description: 'Base',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        },
        {
          name: '95th percentile',
          description: '95.00',
          data: [],
          marker: {enabled: true}
          // , allowPointSelect: true
        }
      ]
    };  // optionsMC

  this.gridOptions.columnDefs = [  // for Portfolio
//    {headerName: 'portfolio_dim_id', field: "portfolio_dim_id",  width:100 },
      {headerName: 'Portfolio Name', field: 'portfolioName', width: 175},
      {headerName: 'Shared?', field: 'sharedPortfolio', width: 65},
//    {headerName: 'loanCount', field: "loanCount",  width: 100 },
      {headerName: 'UPB ($)', field: 'upbDollars', width: 100}
    ];

  this.gridOptions1.columnDefs   = [ // for Sector
      // {headerName: 'Sector', field: "osSector",  width:145 },
      {headerName: 'Sector', field: 'fullName', width: 100},
      {headerName: 'UPB ($)', field: 'upb', width: 80},
      {headerName: 'UPB (%)', field: 'upbPerc', width: 80},
      {headerName: 'Loans', field: 'totalLoan', width: 55}  // ,
      //           {headerName: 'sector', field: "osSector",  width:55 }
    ];

  this.columnDefsSumm = [  // for Summary grid   this.gridOptionsSumm.columnDefs
    {headerName: 'Scenario', field: 'scenario_name', width: 110},
    {headerName: 'PD (%)', field: 'pd', width: 65},
    {headerName: 'LS (%)', field: 'ls', width: 65},
    {headerName: 'EL (%)', field: 'el', width: 65},
    {headerName: 'El ($)', field: 'value', width: 100},
    {headerName: 'Yield Dgd (%)', field: 'yield_degradation', width: 95}
  ];


  this.columnDefsMC = [    // for MonteCarlo (Summary) grid
    {headerName: 'Year', field: 'year_month', width: 110},
    {headerName: 'PD (%)', field: 'pd_cum', width: 65},
    {headerName: 'LS (%)', field: 'ls_cum', width: 65},
    {headerName: 'EL (%)', field: 'el_cum', width: 65},
    {headerName: 'El ($)', field: 'fc_loss_cum', width: 100}
  ];


  // this.columnDefs1YSumm
  this.gridOptions1YSumm.columnDefs  = [
    {headerName: 'Scenario', field: 'scenario_name', width: 110},
    {headerName: 'PD (%)', field: 'pd', width: 65},
    {headerName: 'LS (%)', field: 'ls', width: 65},
    {headerName: 'EL (%)', field: 'el', width: 65} // ,
    //       {headerName: 'El ($)', field: "value",  width:100 },
    //       {headerName: 'Yield Dgd (%)', field: "yield_degradation",  width:95 }
  ];


  // this.columnDefsLoans
    this.gridOptionsLoans.columnDefs = [
    {headerName: 'Name', field: 'rs_propertyname', width: 250},
    {headerName: 'Address', field: 'rs_streetadress', width: 235},
    {headerName: 'City', field: 'rs_city', width: 115},
    {headerName: 'State', field: 'rs_state', width: 50},
    {headerName: 'Zip Code', field: 'rs_zipcode', width: 65},
    {headerName: 'Region', field: 'region', width: 95},
    {headerName: 'Metro', field: 'metcode_name', width: 100},
    {headerName: 'Submarket', field: 'subname', width: 120},
    {headerName: 'Sector', field: 'sector', width: 75},
    {headerName: 'UPB', field: 'current_balance', width: 80},
    {headerName: 'PD', field: 'pd_cum', width: 65},
    {headerName: 'LS', field: 'ls_cum', width: 65},
    {headerName: 'EL', field: 'el_cum', width: 65},
    {headerName: 'El ($)', field: 'el_value', width: 85},
    {headerName: 'DSCR', field: 'dscr', width: 50},
    {headerName: 'LTV', field: 'current_ltv', width: 95}
  ];

};  // ctor


    ngOnInit() {
        this.cols = this.createColumnDefsPortfolioComp(); // createColumnDefs2();
        // this.arr = this.createDGRowData();  	// dataGrid
    }


    private createColumnDefsPortfolioComp() {
        return [
            { field: 'loan_count', header: 'Loan Count' },                    // width:85},
            { field: 'original_upb', header: 'Original UPB' },       // width:85},
            { field: 'current_upb', header: 'Current UPB' },      // width:90},
            { field: 'wa_dscr', header: 'WA DSCR' },   // width:115},
            { field: 'wa_debtYield', header: 'WA Debt Yield' },            // width:90},

            { field: 'wa_ltv', header: 'WA LTV' },   // width:80},
            { field: 'wa_coupon', header: 'WAC' },         // width:120},
            { field: 'avg_loan_size', header: 'Avg. Loan Size' },      // width:95},
            { field: 'largest_loan', header: 'Largest Loan' },       // , width:95}
            { field: 'wa_loan_age', header: 'Avg. Loan Age' },       // , width:95}

            { field: 'wa_rem_term', header: 'WA Rem. Term' },                    // width:85},
            { field: 'wa_rem_amort', header: 'WA Rem. Amort' },       // width:85},
            { field: 'perc_ballon', header: '% Balloon' },      // width:90},
            { field: 'perc_fixed', header: '% Fix' },   // width:115},
            { field: 'interest_only', header: 'Interest only %' }
        ];
    }


    private createDGRowData(dataRow) {  // create data for PC PrimeNG DataGrid
        let arr: Array<PortfolioComposition> = [];
        let pcRow: PortfolioComposition = new PortfolioComposition(
            dataRow.loan_count,
            dataRow.original_upb,
            dataRow.current_upb,
            dataRow.wa_dscr,
            dataRow.wa_ltv,
            dataRow.wa_debtYield,
            dataRow.wa_coupon,
            dataRow.avg_loan_size,
            dataRow.largest_loan,
            dataRow.wa_rem_term,
            dataRow.wa_rem_amort,
            dataRow.wa_loan_age,
            dataRow.perc_ballon,
            dataRow.interest_only,
            dataRow.perc_fixed,
            dataRow.curr_y_qtr,
            dataRow.base_year,
            dataRow.observation_dateDB);

        arr.push(pcRow);
        return arr;
    }


    getPortfolios(formValue) {
        this.portfolioService.getPortfolios(formValue.userID)
            .subscribe (
                data => {
                    console.dir('portfolios: ' + data);
                    let groupeddata = _.groupBy(data, 'portfolio_dim_id');
                    // console.dir("portfolios: "+data);
                    // console.dir(groupeddata);
                    let dedupedData = [];
                    _.forEach(groupeddata, function(value) {
                        dedupedData.push(value[0]);
                    });
                    this.userId = formValue.userID;
                    this.portfolios = data;
                    this.gridOptions.api.setRowData(dedupedData); 	// pass grid data and refresh display
                },
                err => console.log('Can\'t get portfolios. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


    getSectors(portfolioName, userID, scenario, shared) {
        this.sectorService.getSectors(portfolioName, userID, scenario, shared)
            .subscribe (
                data => {
                    console.dir('getSectors()  sectors: ' + data);
                    this.gridOptions1.api.setRowData(data); // pass grid data and refresh display
                },
                err => console.log('Can\'t get sectors data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


    getScenarios(portfolioName, userID, shared) {
        this.scenarioDP = [];
        this.scenarioService.getScenarios(portfolioName, userID, shared)
            .subscribe (
                data => {
                    console.dir('getScenarios()  scenarios: ' + data);
                    for (let row of data) {  // this.scenarioDP.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
                        this.scenarioDP.push({label: row.scenario_name,
                          value: {id: row.OS_scenario_id, name: row.scenario_name, code: row.OS_scenario_id}});
                    }
                },
                err => console.log('Can\'t get scenarios data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


    getPortfolioComposition(portfolioName, userID, sector, shared) {
        this.portfolioCompositionService.getPortfolioComposition(portfolioName, userID, sector, shared)
            .subscribe (
                data => {
                    console.log('getPortfolioComposition()  PortfolioComposition: ' + JSON.stringify(data));
                    this.portfolioComposition = data; // pass grid data and refresh display
                    if (data && data.observation_dateDB) {
                        this.baseDate = data.observation_dateDB;
                        console.log('getPortfolioComposition()  baseDate: ' + data.observation_dateDB);
                        if (data != null && data !== undefined) {
                          this.arr = this.createDGRowData(data);  // populate PC dataGrid
                        }
                    } else {
                      console.log('getPortfolioComposition() ERROR: Can not retrieve data (or baseDate)');
                    }
                },
                err => console.log('Can\'t get PortfolioComposition data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log('Done (After) PortfolioComposition')  // : "+JSON.stringify(this.options.series));
            );
    }


    clearGraphs() {
        // this.chart1.destroy();
        // this.chart1 = new Highcharts.chart("container", this.options);
        // var chart = this.chart1;
        for (let i = 0; i < this.optionsDflt.series.length; i++) {
            this.optionsDflt.series[i].data = [];
            this.chart1.series[i].setData([]);
        }
        // this.optionsDflt.xAxis.categories = [];
        // this.chart1.xAxis.setCategories([]);
        console.log('Cleared series data');
    }


    drawGraph(portfolioName, userID, sector, term, param, shared) { // draw (Summary/PD) Graph
        this.clearGraphs();
        let obj: any = null;
        let labels: Array<number> = [];
        let lblPos: number;
        this.graphService.getGraphs(portfolioName, userID, sector, term, shared)
            .subscribe (
                data => {
                    // console.log("drawGraph (before)  options series: "+JSON.stringify(this.options.series));
                    console.dir('drawGraph()  Graph Data: ' + data);
                    for (let row of data) {
                        obj = this.optionsDflt.series.find(pd => pd.name === row.scenario_name);
                        if (obj != null && row.perc === 'Base') {  // filter only Base data
                            this.showItem('link-Scenorio-Dist', false);
                            this.showItem('link-MonteCarlo-Dist', true);
                            this.showItem('link-EndOfLife-Dist', true);
                            if (param === 'pd') {
                                (obj.data as Array<number>).push(+row.pd);   // was *100
                                console.log('added PD ' + row.pd + ' to series: ' + row.scenario_name);
                                document.getElementById('graphTitle').innerHTML = 'Probability of Default Over Time:';
                            } else if (param === 'el') {
                                (obj.data as Array<number>).push(+row.el);   // was *100
                                console.log('added EL ' + row.el + ' to series: ' + row.scenario_name);
                                document.getElementById('graphTitle').innerHTML = 'Expected Loss Rate Over Time:';
                            } else if (param === 'elValue') {
                                (obj.data as Array<number>).push(+row.elValue);
                                console.log('added EL value ' + (row.elValue) + ' to series: ' + row.scenario_name);
                                document.getElementById('graphTitle').innerHTML = 'Expected Loss Over Time:';
                            } else if (param === 'ls') {
                                (obj.data as Array<number>).push(+row.ls);   // was *100
                                console.log('added LS ' + row.ls + ' to series: ' + row.scenario_name);
                                document.getElementById('graphTitle').innerHTML = 'Loss Severity Over Time:';
                            }
                            lblPos = labels.findIndex(x => x === row.label);
                            if (lblPos === -1) {
                                labels.push(row.label);
                            }
                        }
                    }
                    console.log('drawGraph()  populate graph with Series: ' + JSON.stringify(this.optionsDflt.series));
                    for (let i = 0; i < this.optionsDflt.series.length; i++) {
                        this.chart1.series[i].setData(this.optionsDflt.series[i].data, true);
                    }

                    // reset chart categories
                    this.optionsDflt.xAxis.categories = [];
                    this.chart1.xAxis[0].setCategories([]);

                    let qtrLbl: string;
                    for (let i = 0; i < labels.length; i++) {
                        qtrLbl = this.getQuarter(this.baseDate, labels[i]);
                        // console.log("Quarter: "+qtrLbl);
                        this.optionsDflt.xAxis.categories.push(qtrLbl);
                    }
                    console.log('categories: ' + this.optionsDflt.xAxis.categories);
                    this.chart1.xAxis[0].setCategories(this.optionsDflt.xAxis.categories, true); // populate X axis
                },
                err => console.log('Cannot get Graph data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log('Done (After) Series')  // : "+JSON.stringify(this.optionsDflt.series));
            );
    }


    drawMCGraph(portfolioName, userID, sector, term, param, shared) {  // scenarioName, interval, param) { // draw MonteCarlo Graph
        this.clearMCGraphs();
        let obj: any = null;
        let labels: Array<number> = [];
        let lblPos: number;
        this.graphService.getGraphs(portfolioName, userID, sector, term, shared)   // scenarioName, interval)
            .subscribe (
                data => {
                    // console.log("drawMCGraph (before)  options series: "+JSON.stringify(this.optionsMC.series));
                    console.dir('drawMCGraph()  MonteCarlo Graph Data [' + data.length + ']');   // : "+data);
                    for (let row of data) {
                        obj = this.optionsMC.series.find(pd => pd.description === row.perc);
                        if (obj != null  &&  row.scenario_name === this.scenarioName) {  // filter data only for this selected Scenario
                            this.showItem('link-Scenorio-Dist', false);
                            this.showItem('link-MonteCarlo-Dist', false);
                            this.showItem('link-EndOfLife-Dist', true);

                            if (param === 'pd' || param === 'pd_cum') {
                                (obj.data as Array<number>).push(+row.pd);
                                console.log('added PD ' + row.pd + ' to series for ' + row.perc);
                                document.getElementById('graphTitle').innerHTML = 'Probability of Default Over Time:';
                            } else if (param === 'el' || param === 'el_cum') {
                                (obj.data as Array<number>).push(+row.el);
                                console.log('added EL ' + row.el + ' to series for ' + row.perc);
                                document.getElementById('graphTitle').innerHTML = 'Expected Loss Rate Over Time:';
                            } else if (param === 'ls' || param === 'ls_cum') {
                                (obj.data as Array<number>).push(+row.ls);
                                console.log('added LS ' + row.ls + ' to series for ' + row.perc);
                                document.getElementById('graphTitle').innerHTML = 'Loss Severity Over Time:';
                            } else if (param === 'elValue' || param === 'fc_loss_cum') {
                                (obj.data as Array<number>).push(+row.elValue);
                                console.log('added EL value ' + row.elValue + ' to series for ' + row.perc);
                                document.getElementById('graphTitle').innerHTML = 'Expected Loss Over Time:';
                            }

                            lblPos = labels.findIndex(x => x === row.label);
                            if (lblPos === -1) {
                                labels.push(row.label);
                            }
                        }
                    }
                    console.log('drawMCGraph()  populate graph with Series: ' + JSON.stringify(this.optionsMC.series));
                    for (let i = 0; i < this.optionsMC.series.length; i++) {
                         this.chart1.series[i].setData(this.optionsMC.series[i].data, true);
                        // this.chart1.series[i].update(this.optionsMC.series[i].data, true);
                    }

                    // reset Options
                    // this.chart1.update(this.optionsMC);//setOptions(this.optionsMC);

                    // reset chart categories
                    this.optionsMC.xAxis.categories = [];
                    this.chart1.xAxis[0].setCategories([]);

                    let qtrLbl: string;
                    for (let i = 0; i < labels.length; i++) {
                        qtrLbl = this.getQuarter(this.baseDate, labels[i]);
                        // console.log("Quarter: "+qtrLbl);
                        this.optionsMC.xAxis.categories.push(qtrLbl);
                    }
                    console.log('labels.length: ' + labels.length);
                    console.log('categories: ' + this.optionsMC.xAxis.categories);
                    this.chart1.xAxis[0].setCategories(this.optionsMC.xAxis.categories, true); // populate X axis
                    // document.getElementById("linechart").setOptions(this.optionsMC);

                    console.log(this.chart1);

                    // reset Options
                   // this.chart1.update(this.optionsMC);
                  // this.chart1.series.update(this.optionsMC);
                    // this.chart1 = new Highcharts.Chart(this.optionsMC);

                    // this.saveChart(this.optionsMC);
                    // console.log(this.chart1);
                    // Highcharts.setOptions(this.optionsMC);
                   // this.chart1.options = this.optionsMC;
                    // this.chart1.xAxis[0].isDirty=true;
                    // this.chart1.yAxis[0].isDirty=true;
                    // this.chart1.redraw();
                    // Highcharts.redraw();

                    // ('#container').highcharts().redraw();
                },
                err => console.log('Cannot get MC Graph data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log('Done (After) MC Series')  // : "+JSON.stringify(this.options.series));
            );
    }


    clearMCGraphs() {
        // this.chart1.destroy();
        // this.chart1 = new Highcharts.chart("container", this.options);
        // var chart = this.chart1;
        for (let i = 0; i < this.optionsMC.series.length; i++) {
            this.optionsMC.series[i].data = [];
            this.chart1.series[i].setData([]);
        }
        // this.options.xAxis.categories = [];
        // this.chart1.xAxis.setCategories([]);
        console.log('Cleared MC series data');
    }


    // const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;

    getQuarter(baseDate, label): string {
        let momentFunc = (moment as any).default ? (moment as any).default : moment;
        console.log('getQuarter()  baseDate=' + baseDate + ', label=' + label);    // 2014-12-15T00:00:00.000Z
        let date1 = momentFunc(baseDate, 'YYYY-MM-DD').format('MMMYYYY');   // was this.moment(...)
        // console.log("Date1: "+date1);
        let date2 = momentFunc(date1, 'MMMYYYY').add(+label, 'months').format('MMM YYYY');
        // console.log("Date2: "+date2);
        return date2;
    }




    get1YSummary(portfolioName, userID, sector, term, shared) {
        // this.summary1Y=[];
        this.creditSummaryService.get1YSummary(portfolioName, userID, sector, term, shared)
            .subscribe (
                data => {
                    console.dir('get1YSummary()  Summary data: ' + data);
                    this.gridOptions1YSumm.api.setRowData(data); // pass dropdown data and refresh display
                },
                err => console.log('Can\'t get 1Y Summary data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


    showItem(elementId, isHide) {
        if (isHide) {
          document.getElementById(elementId).classList.add('display-none');
        } else {
          document.getElementById(elementId).classList.remove('display-none');
        }
    }


    selectHeaderItem(elementId, containerElementId) {
        let nodes = document.getElementById(containerElementId).childNodes;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() !== '#text') {
             // nodes[i].classList.remove('header-selected'); // FIX IT
            }
        }

        document.getElementById(elementId).classList.add('header-selected');
    }


    getCreditSummary(portfolioName, userID, sector, term, shared) {
        document.getElementById('summCreditTitle').innerHTML = 'Summary Credit measures';
        if (document.getElementById('summCreditBtns')) {
          // document.getElementById("summCreditBtns").removeClass('display-none')"; //visibility = "visible";
          // OK: not working on Span - hides
          this.showItem('summCreditBtns', false);
        }
        this.summary = [];
        this.gridOptionsSumm.api.setColumnDefs(this.columnDefsSumm);
        this.creditSummaryService.getCreditSummary(portfolioName, userID, sector, term, shared)
            .subscribe (
                data => {
                    console.dir('getCreditSummary()  Summary data: ' + data);
                    this.gridOptionsSumm.api.setRowData(data); // pass dropdown data and refresh display
                },
                err => console.log('Can\'t get Summary data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


    getCreditSummaryMC(portfolioName, userID, sector, scenarioName, interval, shared) {   // MonteCarlo grid (replaces CreditSummary)
        document.getElementById('summCreditTitle').innerHTML = 'Monte Carlo Distribution';
        if (document.getElementById('summCreditBtns')) {
            this.showItem('summCreditBtns', true);
        }
        // TODO: Add Quarterly / Yearly links here !
        this.summary = [];
        this.gridOptionsSumm.api.setColumnDefs(this.columnDefsMC);
        this.creditSummaryService.getMonteCarloData(portfolioName, userID, sector, scenarioName, interval, shared)
            .subscribe (
                data => {
                    console.dir('getCreditSummaryMC()  MonteCarlo data [' + data.length + ']: ' + JSON.stringify(data));
                    this.gridOptionsSumm.api.setRowData(data); // pass dropdown data and refresh display
                },
                err => console.log('Can\'t get MonteCarlo grid data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


    getLoans(userID, portfolioName, sector, scenario, sort, shared) { // get top 10 loans
        let sortColumn;
        if (sort === null || sort === 'undefined' || sort === 'pd')
            sortColumn = 'pd_cum';
        else if (sort === 'el')
            sortColumn = 'el_cum';
        else if (sort === 'ls')
            sortColumn = 'ls_cum';
        else if (sort === 'value')
            sortColumn = 'el_value';

        this.loanService.getLoans(userID, portfolioName, sector, scenario, sortColumn, shared)
            .subscribe (
                data => {
                    console.dir('getLoans()  Loans: ' + data);
                    this.gridOptionsLoans.api.setRowData(data); // pass dropdown data and refresh display
                },
                err => console.log('Can\'t get Loans data. Error code: %s, URL: %s ',  err.status, err.url),
                () =>    console.log( 'Done')
            );
    }


     private onTermChange(evt) {
        // alert("selected new term: "+e.target.textContent);
        if (this.userId == null)
             return;

        this.term = evt.target.textContent;
        this.selectHeaderItem('button-term-' + this.term, 'summCreditBtns');
        this.getPortfolioComposition(this.portfolioName, this.userId, this.sector, this.shared);
        this.getScenarios(this.portfolioName, this.userId, this.shared);
        this.getSectors(this.portfolioName, this.userId, this.scenario, this.shared);
        this.get1YSummary(this.portfolioName, this.userId, this.sector, '1Y', this.shared);
        this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, this.selectedCol, this.shared);
        this.getCreditSummary(this.portfolioName, this.userId, this.sector, this.term, this.shared);
        this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario, this.selectedCol, this.shared);
    }


    private onGraphChange(evt) {    //set different (Graph) mode
        // alert("selected new term: "+e.target.textContent);
        if (this.userId == null)
            return;

        this.graphMode = evt.target.textContent;
        if (this.graphMode === 'Scenario Comparison') {
            this.get1YSummary(this.portfolioName, this.userId, this.sector, '1Y', this.shared);
            this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, this.selectedCol, this.shared);
            this.getCreditSummary(this.portfolioName, this.userId, this.sector, this.term, this.shared);
            this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario, this.selectedCol, this.shared);
        } else if (this.graphMode === 'Monte Carlo Distribution') {
            this.get1YSummary(this.portfolioName, this.userId, this.sector, '1Y', this.shared);
            // this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, "30Y"); //this.selectedCol);  // "30Y"

            this.getCreditSummaryMC(this.portfolioName, this.userId, this.sector, this.scenarioName, 'quarter', this.shared); //this.interval);  '30Y'
            // this.getCreditSummary(this.portfolioName, this.userId, this.sector, this.term);

            this.drawMCGraph(this.portfolioName, this.userId, this.sector, this.term, '30Y', this.shared);

            this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario,  this.selectedCol, this.shared);
        }

        // this.getPortfolioComposition(this.portfolioName, this.userId, this.sector);
        // this.getScenarios(this.portfolioName, this.userId, this.shared);
        // this.getSectors(this.portfolioName, this.userId, this.scenario);

    }


    private onCellDoubleClicked(params) {  // on grid doubleclick - change graph (and top loans grid) for selected column
        this.selectedCol = params.colDef.field;
        console.log('onCellDoubleClicked() selected column: ' + this.selectedCol);

        if (this.selectedCol === 'value') {  // substitute column (param) name
            this.selectedCol = 'elValue';
        }

        // this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, this.selectedCol);  //temp
        this.drawMCGraph(this.portfolioName, this.userId, this.sector, '30Y', this.selectedCol, this.shared);  // temp

        this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario, this.selectedCol, this.shared);
    }


    private onPortfolioSelectionChanged() { // $event
        console.log('selection changed: '); // , event);
        let selectedRows = this.gridOptions.api.getSelectedRows();
        this.portfolioName = selectedRows[0].portfolioName;
        this.shared = selectedRows[0].sharedPortfolio;

        // document.querySelector('#selectedRows').innerHTML = selectedRowsString;

        this.getScenarios(this.portfolioName, this.userId, this.shared);
        this.getSectors(this.portfolioName, this.userId, this.scenario, this.shared);
        this.getPortfolioComposition(this.portfolioName, this.userId, this.sector, this.shared);
        this.get1YSummary(this.portfolioName, this.userId, this.sector, '1Y', this.shared);

        this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, this.selectedCol, this.shared);  // temporary
        // this.drawMCGraph(this.portfolioName, this.userId, this.sector, "30Y", this.selectedCol);  //this.term="30Y"

        this.getCreditSummary(this.portfolioName, this.userId, this.sector, this.term, this.shared);
        this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario, this.selectedCol, this.shared);
    }


    private onSelectedScenarioChanged(event) { // event: any
        this.scenarioName = event.name;   // not used much?
        this.scenario = event.id;
        console.log('Selected scenario: ' + this.scenario + ', scenario name: ' + this.scenarioName); // selectedScenarioName);

        // TODO: add Scenario to these calls
        this.getSectors(this.portfolioName, this.userId, this.scenario, this.shared);

        this.get1YSummary(this.portfolioName, this.userId, this.sector, '1Y', this.shared);
        // this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, "30Y"); //this.selectedCol);  // "30Y"

        this.getCreditSummaryMC(this.portfolioName, this.userId, this.sector, this.scenarioName, 'quarter', this.shared); // this.interval);  '30Y'
        // this.getCreditSummary(this.portfolioName, this.userId, this.sector, this.term);

        this.drawMCGraph(this.portfolioName, this.userId, this.sector, this.term, '30Y', this.shared);

        this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario,  this.selectedCol, this.shared);
    }


    private onSectorSelectionChanged() { // event: any
        console.log('sector selection changed');
        let selectedRows = this.gridOptions1.api.getSelectedRows();
        // var selectedRowsString = '';
        let sectorName = selectedRows[0].fullName;
        console.log('Selected sector: ' + sectorName);
        this.sector = sectorName;
        // this.getSectors(portfolioName, this.userId);
        this.get1YSummary(this.portfolioName, this.userId, this.sector, '1Y', this.shared);
        this.drawGraph(this.portfolioName, this.userId, this.sector, this.term, this.selectedCol, this.shared);
        this.getCreditSummary(this.portfolioName, this.userId, this.sector, this.term, this.shared);
        this.getLoans(this.userId, this.portfolioName, this.sector, this.scenario, this.selectedCol, this.shared);
    }
}



@NgModule({
    imports:      [ FormsModule, HttpModule, AgGridModule.withComponents(['']),
      BrowserModule, ChartModule, //.forRoot(require('highcharts')),
      MdToolbarModule, MdCheckboxModule, MdMenuModule, MdButtonModule,  MdTabsModule,  //BrowserAnimationsModule,
      SharedModule, DropdownModule, DataGridModule, PanelModule, TabViewModule ],  // was AgGridModule.forRoot, ChartModule
    providers: [{
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }   // added export AppModule


// platformBrowserDynamic().bootstrapModule(AppModule);

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

