/*** Created by okonovalov on 5/8/2017.    Get & display Portfolios */
import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AgGridNg2 } from 'ag-grid-angular/main';
import { GridOptions } from 'ag-grid/main';
import { AgGridModule } from 'ag-grid-angular/main';

import { Portfolio } from './app/vo/portfolio';
import { PortfolioService } from './app/service/portfolio-service';


@Component({
    selector: 'app-root',  // 'http-client',
    providers: [ PortfolioService ],
    template: `
<h1>Get Portfolios using PortfolioService (for user)</h1>
<form #f="ngForm" (ngSubmit) = "getPortfolios(f.value)" >
    <label for="userID">Enter User ID</label>
<input id="userID" type="string" name="userID" ngModel>
<button type="submit">Get Portfolios</button>
</form>

<br/>

<h2>Portfolio Selection</h2>   <!-- was: width:880px" -->
<ag-grid-ng2 id="grid-portfolio-selection" class="ag-fresh" [gridOptions]="gridOptions" (selectionChanged)="onPortfolioSelectionChanged()">
    </ag-grid-ng2>  `
})


export class AppComponent {
    private userId: string;
    portfolios: Array<Portfolio>;
    private gridOptions: GridOptions;  // portfolio grid data


    constructor(private portfolioService: PortfolioService) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = []; // 'undefined'];
        this.gridOptions.rowSelection = 'single';
        // this.gridOptions.columnDefs = this.columnDefs;

        this.gridOptions.columnDefs = [  // for Portfolio
            {headerName: 'Portfolio Name', field: 'portfolioName', width: 175},
            {headerName: 'Shared?', field: 'sharedPortfolio', width: 65},
            {headerName: 'UPB ($)', field: 'upbDollars', width: 100}
//    {headerName: 'loanCount', field: "loanCount",  width: 100 },
//    {headerName: 'portfolio_dim_id', field: "portfolio_dim_id",  width:100 },
        ];
    }


    getPortfolios(formValue) {
        this.portfolioService.getPortfolios(formValue.userID)
            .subscribe(
                data => {
                    console.dir("portfolios: " + data);
                    var groupeddata = _.groupBy(data, "portfolio_dim_id");
                    var dedupedData = [];
                    _.forEach(groupeddata, function (value) {
                        dedupedData.push(value[0])
                    });
                    this.userId = formValue.userID;
                    this.portfolios = data;
                    this.gridOptions.api.setRowData(dedupedData); 	// pass grid data and refresh display
                },
                err => console.log("Can't get portfolios. Error code: %s, URL: %s ", err.status, err.url),
                () => console.log('Done')
            );
    }
}


// -----  PortfolioService
import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PortfolioService {

    constructor( private http: Http) {}

    getPortfolioByID(portfolioID: string): Observable<any> {
        return this.http.get(`/api/portfolios/${portfolioID}`)
            .map(res => res.json());
    }

    getPortfolios(userId: string): Observable<any> {
        return this.http.get(`/api/portfolios/${userId}`)
            .map(res => res.json());
    }
}


// "ag-grid": "^9.0.3",  "ag-grid-angular": "^9.0.3",


// scripts: "restServer1": "nodemon build/cre-rest-server-angular.js",
//  "mssql": "3.3.0",

//--- Server
import * as express from "express";
import * as path from "path";

import { Portfolio } from './vo/portfolio';
const app = express();

app.use('/',             express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

var userId:string;
var portfolios = [];  // array of Portfolios

function getPortfolios(userID): Array<Portfolio> {
    console.log("server:  getPortfolios for user id: "+userID);
    return portfolios;
}

app.get('/portfolios', (req, res) => {
    console.log("server:  get all portfolios in JSON for userID: "+req.params.userID);
    getPortfoliosFromDB1(res, req.params.userID);//'arnab.ganguly');
    //getPortfoliosFromDB(res, req.params.userID);'arnab.ganguly');
    //res.json(getPortfolios());
});

function getPortfolioById(portfolioId: number): Portfolio {
    console.log("server:  getPortfolioById: "+portfolioId);
    return portfolios.find(p => p.portfolio_dim_id === portfolioId);
}


app.get('/portfolios/:userID', (req, res) => {  //OK: was: /portfolios/:id
    console.log("server:  get portfolio [in JSON] by id: "+req.params.userID);  //OK - right param?
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getPortfoliosFromDB1(res, req.params.userID);//'arnab.ganguly');

    console.log("server:  get portfolios for user: "+req.params.userID);
    //getPortfolios(req.params.userID);   //OK - right param?
});


sql = require('mssql');

function getPortfoliosFromDB1 (response, userID) {

    var portfolios:Array<Portfolio> = [];  // array of Portfolios

    sql.connect(config, function (err) {
        // ... error checks

        var request = new sql.Request();
        request.stream = true; // You can set streaming differently for each request
        if (userID == null || userID == 'undefined')
            request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly') //sql.Int, value)
        else {
            request.input('USER_NAME', sql.VarChar(50), userID);
            userId = userID;  // save
        }
        console.log("getPortfoliosFromDB()  calling SP usp_fetch_portfolios_logged_user with param userId="+userId);
        request.execute('usp_fetch_portfolios_logged_user');//query('select * from verylargetable'); // or request.execute(procedure);

        request.on('recordset', function (columns) {
            // Emitted once for each recordset in a query
            var str = JSON.stringify(columns);
            console.dir(str);
        });

        request.on('row', function (row) {
            // Emitted for each row in a recordset
            var portfolio = new Portfolio(
                row.portfolio_dim_id,
                row.portfolioName,
                getDollarNumWithNull(row.upbDollars),
                row.portfolioUpdated,
                row.sharedPortfolio,
                row.sharedWithOther,
                row.shareWithOtherUserName,
                row.shareWithOtherCompanyName,
                row.shareWithOtherUserDate
            );
            portfolios.push(portfolio);
            console.log("upl row: "+JSON.stringify(portfolio));
        });

        request.on('error', function (err) {
            // May be emitted multiple times
            console.log("ERROR: "+err);
        });

        request.on('done', function (affected) {
            // Always emitted as the last one
            console.log("Portfolios size: "+portfolios.length);
            console.dir("on(done):  Portfolios is : "+JSON.stringify(portfolios));
            response.json(portfolios);
            console.log("DONE");
        });
    });

    sql.on('error', function (err) {
        // ... error handler
        console.log("ERROR1: "+err);
    });



    // Number formatting functions

    function getPercentWithNull(numb):string {
        if (numb == null || numb == undefined) {
            numb = '-';  //0;
            return numb;
        }
        return numb.toFixed(2)+" %";
    }


    function getNumWithNull(numb):string {
        if (numb == null || numb == undefined) {
            numb = '-';  //0;
            return numb;
        }
        return numb.toFixed();
    }


    function getNumWithNull2(numb):string {
        if (numb == null || numb == undefined) {
            numb = '-';  //0;
            return numb;
        }
        return numb.toFixed(2);
    }


    function getNumWithNull2Num(numb):number {
        if (numb == null || numb == undefined) {
            numb = '-';  //0;
            return numb;
        }
        return (Math.round(((100 - numb) * 100) * 100) / 100); //numb.toFixed(2);
    }



    function getDollarNumWithNull(numb):string {
        if (numb == null || numb == undefined) {
            return '-';
        }
//    if (typeof(numb) === 'number') {
        if (numb >= 1000000000)
            return '$ ' + (numb / 1000000000).toFixed(2) + ' B';
        else if (numb >= 1000000)
            return '$ ' + (numb / 1000000).toFixed(2) + ' M';
        else if (numb >= 1000)
            return '$ ' + (numb / 1000).toFixed(2) + ' K';
        else
            return '$ ' + numb.toFixed();
//    } else
//        console.log ("getDollarNumWithNull() "+numb+" is NOT Numeric")
    }

}