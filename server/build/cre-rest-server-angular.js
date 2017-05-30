"use strict";
var express = require("express");
var path = require("path");
var portfolio_1 = require("./vo/portfolio");
var sector_1 = require("./vo/sector");
var scenario_1 = require("./vo/scenario");
var graphData_1 = require("./vo/graphData");
var mcData_1 = require("./vo/mcData");
var portfolioComposition_1 = require("./vo/portfolioComposition");
var creditSummary_1 = require("./vo/creditSummary");
var loan_1 = require("./vo/loan");
var uploadedPortfolio_1 = require("./vo/uploadedPortfolio");
var loanDetail_1 = require("./vo/loanDetail");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
var userId;
var portfolios = []; // array of Portfolios
var sectors = [];
var scenarios = [];
var summary1y = [];
var graphs = [];
var mcdata = [];
var portfolioCompositions = [];
var creditSummary = [];
var loans = [];
var upPortfolios = []; // array of UploadedPortfolios
var loanDetails = []; // for loan details popup
function getSectors(userID) {
    console.log("server:  getSectors for user id: " + userID);
    return sectors;
}
function getScenarios(userID) {
    console.log("server:  getScenarios for user id: " + userID);
    return scenarios;
}
function getGraphs(userID) {
    console.log("server:  getGraphs for user id: " + userID);
    return graphs;
}
function getPortfolios(userID) {
    console.log("server:  getPortfolios for user id: " + userID);
    return portfolios;
}
function getPortfolioComposition(userID) {
    console.log("server:  getPortfolioComposition for user id: " + userID);
    return portfolioCompositions[0];
}
function getCreditSummary(userID) {
    console.log("server:  getCreditSummary for user id: " + userID);
    return creditSummary;
}
function get1YSummary(userID) {
    console.log("server:  getCreditSummary for user id: " + userID);
    return creditSummary;
}
function getLoans(userID) {
    console.log("server:  getLoans for user id: " + userID);
    return loans;
}
//----
function getUploadedPortfolios(userID) {
    console.log("server:  getUploadedPortfolios for user id: " + userID);
    return upPortfolios;
}
//-----
app.get('/api/upPortfolios/:userID', function (req, res) {
    console.log("server:  get uploaded portfolios [in JSON] by id: " + req.params.userID); //OK - right param?
    getUploadedPortfoliosFromDB(res, req.params.userID); //'arnab.ganguly');
    console.log("server:  get uploaded portfolios for user: " + req.params.userID);
    getUploadedPortfolios(req.params.userID);
});
app.get('/api/loandetails/:userID/:portfolioName/:sector/:propId/:shared/:type/:term', function (req, res) {
    console.log("server:  get Loan Details [in JSON] by  userID: " + req.params.userID + ", portfolioName: " + req.params.portfolioName + ", sector: " + req.params.sector + ", scenario: " + req.params.propId + ", shared: " + req.params.shared + ", type: " + req.params.type + ", term: " + req.params.term);
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getLoanDetailsFromDB(res, req.params.userID, req.params.portfolioName, req.params.sector, req.params.propId, req.params.shared, req.params.type, req.params.term); //response, userID, portfolioName, sector, propId, shared, type, term
    return loanDetails;
});
//----
app.get('/api/portfolios', function (req, res) {
    console.log("server:  get all portfolios in JSON for userID: " + req.params.userID);
    getPortfoliosFromDB1(res, req.params.userID); //'arnab.ganguly');
    //getPortfoliosFromDB(res, req.params.userID);'arnab.ganguly');
    //res.json(getPortfolios());
});
function getPortfolioById(portfolioId) {
    console.log("server:  getPortfolioById: " + portfolioId);
    return portfolios.find(function (p) { return p.portfolio_dim_id === portfolioId; });
}
app.get('/api/portfolios/:userID', function (req, res) {
    console.log("server:  get portfolio [in JSON] by id: " + req.params.userID); //OK - right param?
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getPortfoliosFromDB1(res, req.params.userID); //'arnab.ganguly');
    //test
    //getUploadedPortfoliosFromDB(res, req.params.userID);
    console.log("server:  get portfolios for user: " + req.params.userID);
    //getPortfolios(req.params.userID);   //OK - right param?
});
app.get('/api/sectors', function (req, res) {
    console.log("server:  get all Sectors in JSON for portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", scenario: " + req.params.scenario + ", shared: " + req.params.shared);
    getSectorsFromDB(res, req.params.portfolioName, req.params.userID, req.params.scenario, req.params.shared); //'arnab.ganguly');
    //getPortfoliosFromDB(res, req.params.userID);'arnab.ganguly');
    //res.json(getPortfolios());
});
app.get('/api/sectors/:portfolioName/:userID/:scenario/:shared', function (req, res) {
    console.log("server:  get sectors [in JSON] by portfolioName: " + req.params.portfolioName + ", id: " + req.params.userID + ", scenario: " + req.params.scenario + ", shared: " + req.params.shared); //OK - right param?
    getSectorsFromDB(res, req.params.portfolioName, req.params.userID, req.params.scenario, req.params.shared); //'arnab.ganguly');
    return sectors;
});
app.get('/api/scenarios', function (req, res) {
    console.log("server:  get all Scenarios in JSON for portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", shared: " + req.params.shared);
    getScenariosFromDB(res, req.params.portfolioName, req.params.userID, req.params.shared); //'arnab.ganguly');
    //getPortfoliosFromDB(res, req.params.userID);'arnab.ganguly');
    //res.json(getPortfolios());
});
app.get('/api/scenarios/:portfolioName/:userID/:shared', function (req, res) {
    console.log("server:  get scenarios [in JSON] by portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", shared: " + req.params.shared); //OK - right param?
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getScenariosFromDB(res, req.params.portfolioName, req.params.userID, req.params.shared); //'arnab.ganguly');
    return scenarios;
});
app.get('/api/graphs', function (req, res) {
    console.log("server:  get all Graphs in JSON for portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", shared: " + req.params.shared);
    getGraphDataFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, req.params.term, req.params.shared); //'arnab.ganguly');
});
app.get('/api/mc', function (req, res) {
    console.log("server:  get all MonteCarlo Graphs in JSON for portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", shared: " + req.params.shared);
    getMCDataFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, req.params.scenarioName, req.params.interval, req.params.shared); //'arnab.ganguly');
});
app.get('/api/graphs/:portfolioName/:userID/:sector/:term/:shared', function (req, res) {
    console.log("server:  get Graphs [in JSON] by portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", sector: " + req.params.sector + ", term=" + req.params.term + ", shared: " + req.params.shared);
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getGraphDataFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, req.params.term, req.params.shared);
    return graphs;
});
app.get('/api/mc/:portfolioName/:userID/:sector/:scenarioName/:interval/:shared', function (req, res) {
    console.log("server:  get MC Data [in JSON] by portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", sector: " + req.params.sector + ", scenarioName: " + req.params.scenarioName + ", interval=" + req.params.interval + ", shared: " + req.params.shared);
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getMCDataFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, req.params.scenarioName, req.params.interval, req.params.shared);
    return mcdata;
});
app.get('/api/portfolioComposition/:portfolioName/:userID/:sector/:shared', function (req, res) {
    console.log("server:  get PortfolioComposition [in JSON] by portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", sector: " + req.params.sector + ", shared: " + req.params.shared);
    getPortfolioCompositionFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, req.params.shared);
    return portfolioCompositions[0];
});
app.get('/api/summary/:portfolioName/:userID/:sector/:term/:shared', function (req, res) {
    console.log("server:  get CreditSummary [in JSON] by portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", sector: " + req.params.sector + ", term=" + req.params.term + ", shared: " + req.params.shared);
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getCreditSummaryFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, req.params.term, req.params.shared);
    return creditSummary;
});
app.get('/api/summary1y/:portfolioName/:userID/:sector/:term/:shared', function (req, res) {
    console.log("server:  get 1YSummary [in JSON] by portfolioName: " + req.params.portfolioName + ", userID: " + req.params.userID + ", sector: " + req.params.sector + ", term=" + req.params.term + ", shared: " + req.params.shared);
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    get1YSummaryFromDB(res, req.params.portfolioName, req.params.userID, req.params.sector, '1Y', req.params.shared); // always 1Y term  // req.params.term);
    return summary1y;
});
app.get('/api/loans/:userID/:portfolioName/:sector/:scenario/:sort/:shared', function (req, res) {
    console.log("server:  get Loans [in JSON] by  userID: " + req.params.userID + ", portfolioName: " + req.params.portfolioName + ", sector: " + req.params.sector + ", scenario: " + req.params.scenario + ", sort: " + req.params.sort + ", shared: " + req.params.shared);
    // res.json(getPortfolioById(req.params.userID)); //parseInt(req.params.portfolio_dim_id)));
    getLoansFromDB(res, req.params.userID, req.params.portfolioName, req.params.sector, req.params.scenario, req.params.sort, req.params.shared);
    // getLoanDetailsFromDB(res, req.params.userID, req.params.portfolioName, req.params.sector, req.params.propId, req.params.shared, req.params.type, req.params.term);  // just to test
    return loans;
});
app.get('/', function (req, res) {
    console.log("server:  get(root) file ../client/main.html");
    res.sendFile(path.join(__dirname, '../client/main.html'));
    // allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
});
var server = app.listen(8000, "0.0.0.0", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
var sql;
var request;
var config = {
    user: 'mbscre_user',
    password: 'mbs123',
    server: 'REISMBSDEV',
    database: 'MBSCRE_DW',
    stream: true // You can enable streaming globally
};
function getPortfoliosFromDB(res, userId) {
    sql = require('mssql');
    sql.connect("mssql://mbscre_user:mbs123@REISMBSDEV/MBSCRE_DW").then(function () {
        // Query
        //var value = 'arnab.ganguly';
        request = new sql.Request();
        if (userId == null || userId == 'undefined')
            request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly'); //sql.Int, value)
        else
            request.input('USER_NAME', sql.VarChar(50), userId);
        console.log("calling SP usp_fetch_portfolios_logged_user with param userId=" + userId);
        request.execute('usp_fetch_portfolios_logged_user') //query('select * from verylargetable'); // or request.execute(procedure);
            .then(function (recordset) {
            var str = JSON.stringify(recordset);
            console.dir(str); //recordsets);
            //res.json(recordset);
            //console.dir("Porfolios: "+JSON.stringify(portfolios));
            //JSON.stringify(recordsets);
        }).catch(function (err) {
            // ... query error checks
            console.log(err);
        });
    }).catch(function (err) {
        // ... connect error checks
        console.log(err);
    });
}
sql = require('mssql');
function getPortfoliosFromDB1(response, userID) {
    var portfolios = []; // array of Portfolios
    sql.connect(config, function (err) {
        // ... error checks
        var request = new sql.Request();
        request.stream = true; // You can set streaming differently for each request
        if (userID == null || userID == 'undefined')
            request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly'); //sql.Int, value)
        else {
            request.input('USER_NAME', sql.VarChar(50), userID);
            userId = userID; // save
        }
        console.log("getPortfoliosFromDB()  calling SP usp_fetch_portfolios_logged_user with param userId=" + userId);
        request.execute('usp_fetch_portfolios_logged_user'); //query('select * from verylargetable'); // or request.execute(procedure);
        request.on('recordset', function (columns) {
            // Emitted once for each recordset in a query
            var str = JSON.stringify(columns);
            console.dir(str);
        });
        request.on('row', function (row) {
            // Emitted for each row in a recordset
            var portfolio = new portfolio_1.Portfolio(row.portfolio_dim_id, row.portfolioName, getDollarNumWithNull(row.upbDollars), row.portfolioUpdated, row.sharedPortfolio, row.sharedWithOther, row.shareWithOtherUserName, row.shareWithOtherCompanyName, row.shareWithOtherUserDate);
            portfolios.push(portfolio);
            console.log("upl row: " + JSON.stringify(portfolio));
        });
        request.on('error', function (err) {
            // May be emitted multiple times
            console.log("ERROR: " + err);
        });
        request.on('done', function (affected) {
            // Always emitted as the last one
            console.log("Portfolios size: " + portfolios.length);
            console.dir("on(done):  Portfolios is : " + JSON.stringify(portfolios));
            response.json(portfolios);
            console.log("DONE");
        });
    });
    sql.on('error', function (err) {
        // ... error handler
        console.log("ERROR1: " + err);
    });
}
function getSectorsFromDB(response, portfolioName, userID, scenario, shared) {
    sectors = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  'russtest', 'olegkon', '1' ,true:    	@PORTFOLIO_NAME varchar(200), @USER_NAME varchar(50), @SCENARIO_NAME varchar(1), @SHARED_PORTFOLIO bit
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(200), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(200), portfolioName);
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('SCENARIO_NAME', sql.VarChar(1), '1');
    else
        request.input('SCENARIO_NAME', sql.VarChar(1), scenario);
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    console.log("calling SP usp_fetch_scenario_sectors_main_new_c with param portfolioName=" + portfolioName + ", userId=" + userId + ", scenario=" + scenario + ", shared=" + shared);
    request.execute('usp_fetch_scenario_sectors_main_new_c');
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        var sector = new sector_1.Sector(row.fullName, getDollarNumWithNull(row.upb), getPercentWithNull(row.upbPerc), row.totalLoan, row.osSector);
        sectors.push(sector);
        console.log("row: " + JSON.stringify(sector));
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("Sectors size: " + sectors.length);
        console.dir("on(done):  Sectors : " + JSON.stringify(sectors));
        response.json(sectors);
        console.log("DONE");
    });
}
function getScenariosFromDB(response, portfolioName, userID, shared) {
    scenarios = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  'russtest', 'olegkon', '1' ,true:    	@PORTFOLIO_NAME varchar(200), @USER_NAME varchar(50), @SCENARIO_NAME varchar(1), @SHARED_PORTFOLIO bit
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(200), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(200), portfolioName);
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    request.input('TOKEN_ID', sql.VarChar(50), null);
    console.log("calling SP usp_fetch_portfolio_scenarios_main_new_c with param portfolioName=" + portfolioName + ", userId=" + userId + ", shared=" + shared);
    request.execute('usp_fetch_portfolio_scenarios_main_new_c');
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        var scenario = new scenario_1.Scenario(row.scenario_name, row.OS_scenario_id);
        scenarios.push(scenario);
        console.log("row: " + JSON.stringify(scenario));
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("Scenarios size: " + scenarios.length);
        console.dir("on(done):  Scenarios : " + JSON.stringify(scenarios));
        response.json(scenarios);
        console.log("scenarios DONE");
    });
}
function getGraphDataFromDB(response, portfolioName, userID, sector, term, shared) {
    graphs = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  usp_fetch_analysis_vector_data_ndm_st2  'olegkon', '1147', 'Apt', true, '30Y'
    // @PORTFOLIO_NAME varchar(200), @USER_NAME varchar(50), @SCENARIO_NAME varchar(1), @SHARED_PORTFOLIO bit
    //@USER_NAME varchar(50), PORTFOLIO_NAME varchar(100), @SECTOR_NAME varchar(5), @SHARED_PORTFOLIO bit, @QUARTAL_SELECTION varchar(30)
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector == null || sector == 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    if (term == null || term == 'undefined')
        request.input('QUARTAL_SELECTION', sql.VarChar(30), '1Y');
    else
        request.input('QUARTAL_SELECTION', sql.VarChar(30), term);
    console.log("getGraphDataFromDB()  calling SP usp_fetch_analysis_vector_data_ndm_st3 with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", 'All', " + shared + ", " + term);
    request.execute('usp_fetch_analysis_vector_data_ndm_st3'); //OK: had to make LBL ascending (was ST2)
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        //console.log("raw row: "+JSON.stringify(row));
        var graph = new graphData_1.GraphData(row.scenario_id, row.scenario_name, row.pd, //getNumWithNull2(row.pd),  //row.pd.toFixed(2),
        row.perc, row.month, row.label, row.el, //getNumWithNull2(row.el),  //row.el.toFixed(2),
        row.elValue, //getDollarNumWithNull(row.elValue), //.toFixed(2),
        row.ls //getPercentWithNull(row.ls) //row.ls//.toFixed(2)
        ); //getPercentWithNull(row.pd_cum*100), getPercentWithNull(row.ls_cum*100), getPercentWithNull(row.el_cum*100), getDollarNumWithNull(row.fc_loss_cum)
        console.log("row: " + JSON.stringify(graph));
        graphs.push(graph);
        //console.log("row: "+JSON.stringify(graph));
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("Graphs size: " + graphs.length);
        console.dir("on(Graphs done):  Graphs : " + JSON.stringify(graphs));
        response.json(graphs);
        console.log("Graphs DONE");
    });
}
function getMCDataFromDB(response, portfolioName, userID, sector, scenarioName, interval, shared) {
    mcdata = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  usp_fetch_credit_cumulative_data 'olegkon', 'fhlbtest2', 'All', 'REIS Severe', 1, 'quarter'
    // USER_NAME VARCHAR(50), @PORTFOLIO_NAME VARCHAR(100), @SECTOR_NAME VARCHAR(50), @SCENARIO_NAME VARCHAR(255), @SHARED_PORTFOLIO BIT = 0, @TIME_INTERVAL VARCHAR(10)
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector == null || sector == 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    if (scenarioName == null || scenarioName == 'undefined')
        request.input('SCENARIO_NAME', sql.VarChar(255), 'All');
    else
        request.input('SCENARIO_NAME', sql.VarChar(255), scenarioName);
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);  // hardcode
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    if (interval == null || interval == 'undefined')
        request.input('TIME_INTERVAL', sql.VarChar(10), 'quarter');
    else
        request.input('TIME_INTERVAL', sql.VarChar(10), interval);
    //usp_fetch_credit_cumulative_data ( 'olegkon', 'fhlbtest2', 'All', 'REIS Adverse', true, 'quarter') // MC
    console.log("calling SP usp_fetch_credit_cumulative_data with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", '" + sector + "', '" + scenarioName + "', " + shared + ", " + interval); //MC graph
    //@USER_NAME VARCHAR(50), @PORTFOLIO_NAME VARCHAR(100), @SECTOR_NAME VARCHAR(50), @SCENARIO_NAME VARCHAR(255), @SHARED_PORTFOLIO BIT = 0, @TIME_INTERVAL VARCHAR(10)
    request.execute('usp_fetch_credit_cumulative_data'); //OK:
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        //console.log("raw row: "+JSON.stringify(row));
        var mc = new mcData_1.MCData(row.year_month, row.pd_cum * 100, // getPercentWithNull(row.pd_cum*100),
        row.ls_cum * 100, //getPercentWithNull(row.ls_cum*100),
        row.el_cum * 100, //getPercentWithNull(row.el_cum*100),
        row.fc_loss_cum //getDollarNumWithNull(row.fc_loss_cum)
        );
        console.log("row: " + JSON.stringify(mc));
        mcdata.push(mc);
        //console.log("row: "+JSON.stringify(graph));
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("MonteCarlo Grid data size: " + mcdata.length);
        console.dir("on(done):  MCGrid : " + JSON.stringify(mcdata));
        response.json(mcdata);
        console.log("MCGrid DONE");
    });
}
function getPortfolioCompositionFromDB(response, portfolioName, userID, sector, shared) {
    portfolioCompositions = []; //null;   // reset
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  usp_fetch_analysis_composition_data_agr 'olegkon', '1147-5', 'All', 1, true
    //@USER_NAME varchar(50), PORTFOLIO_NAME varchar(100), @SECTOR_NAME varchar(5), @SCENARIO_ID varchar(100), @SHARED_PORTFOLIO bit
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector == null || sector == 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    request.input('SCENARIO_ID', sql.VarChar(100), 1);
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    console.log("calling SP usp_fetch_analysis_composition_data_agr with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", 'All', " + shared + ", true");
    request.execute('usp_fetch_analysis_composition_data_agr'); //OK:
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir("PortfolioComposition recordset: " + str);
    });
    request.on('row', function (row) {
        console.log("PortfolioComposition: " + JSON.stringify(row));
        // Emitted for each row in a recordset
        var portfolioComposition = new portfolioComposition_1.PortfolioComposition(row.loan_count, getDollarNumWithNull(row.original_upb), getDollarNumWithNull(row.current_upb), getNumWithNull2(row.wa_dscr), getPercentWithNull(row.wa_ltv * 100), getPercentWithNull(row.wa_debtYield * 100), getPercentWithNull(row.wa_coupon), getDollarNumWithNull(row.avg_loan_size), getDollarNumWithNull(row.largest_loan), getNumWithNull2(row.wa_rem_term), getNumWithNull2(row.wa_rem_amort), getNumWithNull2(row.wa_loan_age), getPercentWithNull(row.perc_ballon), getPercentWithNull(row.interest_only), getPercentWithNull(row.perc_fixed), row.curr_y_qtr, row.base_year, row.observation_dateDB);
        portfolioCompositions.push(portfolioComposition);
        //this.portfolioComposition = portfolioComposition;
        console.log("row: " + JSON.stringify(portfolioComposition));
        //response.json(portfolioComposition);
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("PortfolioComposition size: " + portfolioCompositions.length);
        console.dir("on(done):  PortfolioCompositions[0] is : " + JSON.stringify(portfolioCompositions[0]));
        response.json(portfolioCompositions[0]);
        console.log("DONE");
    });
    sql.on('error', function (err) {
        // ... error handler
        console.log("ERROR1: " + err);
    });
}
function getCreditSummaryFromDB(response, portfolioName, userID, sector, term, shared) {
    creditSummary = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  usp_fetch_analysis_cumulative_data_agr  'olegkon', '1147', 'All', null, 'BASE', 1, '1Y'
    // @USER_NAME varchar(50), @PORTFOLIO_NAME varchar(100), @SECTOR_NAME varchar(5), @SCENARIO_ID varchar(10),
    // @PERCENTILE varchar(5), @SHARED_PORTFOLIO bit, @QUARTAL_SELECTION varchar(30)
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector == null || sector == 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    request.input('SCENARIO_ID', sql.VarChar(10), null); //really null by dflt?
    //if (percentile == null || percentile == 'undefined')
    request.input('PERCENTILE', sql.VarChar(5), 'BASE');
    //else
    //    request.input('PERCENTILE', sql.VarChar(5), percentile);
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    if (term == null || term == 'undefined')
        request.input('QUARTAL_SELECTION', sql.VarChar(30), '1Y');
    else
        request.input('QUARTAL_SELECTION', sql.VarChar(30), term);
    console.log("calling SP usp_fetch_analysis_cumulative_data_agr with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", 'All', null, 'BASE', " + shared + ", " + term);
    request.execute('usp_fetch_analysis_cumulative_data_agr'); //OK: had to make LBL ascending (was ST2)
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        //console.log("raw row: "+JSON.stringify(row));
        var summaryRow = new creditSummary_1.CreditSummary(row.scenario, row.scenario_name, getPercentWithNull(row.pd * 100), getPercentWithNull(row.ls * 100), getPercentWithNull(row.el * 100), row.perc, getDollarNumWithNull(row.value), getPercentWithNull(row.yield_degradation));
        console.log("row: " + JSON.stringify(summaryRow));
        creditSummary.push(summaryRow);
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("Summary size: " + creditSummary.length);
        console.dir("on(done):  Credit Summary : " + JSON.stringify(creditSummary));
        response.json(creditSummary);
        console.log("Summary DONE");
    });
}
function get1YSummaryFromDB(response, portfolioName, userID, sector, term, shared) {
    summary1y = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  usp_fetch_analysis_cumulative_data_agr  'olegkon', '1147', 'All', null, 'BASE', 1, '1Y'
    // @USER_NAME varchar(50), @PORTFOLIO_NAME varchar(100), @SECTOR_NAME varchar(5), @SCENARIO_ID varchar(10),
    // @PERCENTILE varchar(5), @SHARED_PORTFOLIO bit, @QUARTAL_SELECTION varchar(30)
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector == null || sector == 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    request.input('SCENARIO_ID', sql.VarChar(10), null); //really null by dflt?
    //if (percentile == null || percentile == 'undefined')
    request.input('PERCENTILE', sql.VarChar(5), 'BASE');
    //else
    //    request.input('PERCENTILE', sql.VarChar(5), percentile);
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    if (term == null || term == 'undefined')
        request.input('QUARTAL_SELECTION', sql.VarChar(30), '1Y');
    else
        request.input('QUARTAL_SELECTION', sql.VarChar(30), term);
    console.log("calling SP usp_fetch_analysis_cumulative_data_agr with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", " + sector + ", null, 'BASE', " + shared + ", " + term);
    request.execute('usp_fetch_analysis_cumulative_data_agr'); //OK: had to make LBL ascending (was ST2)
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        //console.log("raw row: "+JSON.stringify(row));
        var summaryRow = new creditSummary_1.CreditSummary(row.scenario, row.scenario_name, getPercentWithNull(row.pd * 100), getPercentWithNull(row.ls * 100), getPercentWithNull(row.el * 100), row.perc, getDollarNumWithNull(row.value), getPercentWithNull(row.yield_degradation));
        console.log("row: " + JSON.stringify(summaryRow));
        summary1y.push(summaryRow);
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("1YSummary size: " + summary1y.length);
        console.dir("on(done):  1Y Credit Summary : " + JSON.stringify(summary1y));
        response.json(summary1y);
        console.log("1Y Summary DONE");
    });
}
function getLoansFromDB(response, userID, portfolioName, sector, scenario, sort, shared) {
    loans = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  usp_fetch_analysis_top_loan_data 'olegkon', '1147-5', 'All', '1', 'pd_cum', 'desc', true, 0, 10   --,'year'
    //@USER_NAME VARCHAR(50), @PORTFOLIO_NAME VARCHAR(100), @SECTOR_NAME VARCHAR(5), @SCENARIO_NAME VARCHAR(100), @SORTING_PARAM VARCHAR(20), @SORTING_ORDER VARCHAR(20),
    //    @SHARED_PORTFOLIO BIT, @OFFSET INT, @LIMIT INT
    if (userId == null || userId == 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName == null || portfolioName == 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector == null || sector == 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    if (scenario == null || scenario == 'undefined')
        request.input('SCENARIO_NAME', sql.VarChar(100), 1);
    else
        request.input('SCENARIO_NAME', sql.VarChar(100), scenario); //really null by dflt?
    if (sort == null || sort == 'undefined')
        request.input('SORTING_PARAM', sql.VarChar(20), 'pd_cum');
    else
        request.input('SORTING_PARAM', sql.VarChar(20), sort);
    request.input('SORTING_ORDER', sql.VarChar(20), 'desc');
    //request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    if (shared == null || shared == 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    request.input('OFFSET', sql.INT, 0);
    request.input('LIMIT', sql.INT, 10);
    console.log("calling SP usp_fetch_analysis_top_loan_data with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", '" + sector + "', '" + scenario + "', '" + sort + "', 'desc', " + shared + ", 0, 10");
    request.execute('usp_fetch_analysis_top_loan_data'); //OK: had to make LBL ascending (was ST2)
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        //console.log("raw row: "+JSON.stringify(row));
        var loan = new loan_1.Loan(row.portfolio_property_dim_id, row.rs_propertyname, row.rs_streetadress, row.rs_city, row.rs_state, row.rs_zipcode, row.region, row.metcode_name, row.subname, row.sector, getDollarNumWithNull(row.current_balance), getPercentWithNull(row.pd_cum), getPercentWithNull(row.ls_cum), getPercentWithNull(row.el_cum), getDollarNumWithNull(row.el_value), getNumWithNull2(row.dscr), getPercentWithNull(row.current_ltv));
        console.log("row: " + JSON.stringify(loan));
        loans.push(loan);
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("Loans size: " + loans.length);
        console.dir("on(done):  Loans : " + JSON.stringify(loans));
        response.json(loans);
        console.log("10 top Loans DONE");
    });
}
// ------  for Uploaded Portfolios
function getUploadedPortfoliosFromDB(response, userID) {
    var upPortfolios = []; // array of Uploaded Portfolios
    sql.connect(config, function (err) {
        // ... error checks
        var request = new sql.Request();
        request.stream = true; // You can set streaming differently for each request
        if (userID === null || userID === 'undefined')
            request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
        else {
            request.input('USER_NAME', sql.VarChar(50), userID);
            userId = userID; // save
        }
        console.log(' getUploadedPortfoliosFromDB()  calling SP usp_fetch_staging_portfolios_logged_user with param userId=' + userId);
        request.execute('usp_fetch_staging_portfolios_logged_user');
        request.on('recordset', function (columns) {
            // Emitted once for each recordset in a query
            var str = JSON.stringify(columns);
            console.dir(str);
        });
        request.on('row', function (row) {
            // Emitted for each row in a recordset
            var upPortfolio = new uploadedPortfolio_1.UploadedPortfolio(row.portfolio_dim_id, row.portfolioName, getDollarNumWithNull(row.upbDollars), row.portfolioUpdated, row.sharedPortfolio, row.sharedWithOther, row.shareWithOtherUserName, row.shareWithOtherCompanyName, row.shareWithOtherUserDate, row.loanCount, row.status, row.propertyUniqueFileName, row.creditUniqueFileName);
            upPortfolios.push(upPortfolio);
            console.log("uploaded portfolio row: " + JSON.stringify(upPortfolio));
        });
        request.on('error', function (err) {
            // May be emitted multiple times
            console.log("ERROR: " + err);
        });
        request.on('done', function (affected) {
            // Always emitted as the last one
            console.log("Uploaded Portfolios size: " + upPortfolios.length);
            console.dir("on(done): Uploaded Portfolios: " + JSON.stringify(upPortfolios));
            response.json(upPortfolios);
            console.log("Uploaded Portfolios DONE");
        });
    });
    sql.on('error', function (err) {
        // ... error handler
        console.log("ERROR1: " + err);
    });
}
function getLoanDetailsFromDB(response, userID, portfolioName, sector, propId, shared, type, term) {
    loanDetails = [];
    //   sql.connect(config, function (err) {
    // ... error checks
    console.log("userid is " + userID);
    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request
    //SP Params:  //usp_fetch_dataview_detail_data_agr 'olegkon','fhlbtest2','All',32375,1,'year',30
    //@USER_NAME  VARCHAR(50) , @PORTFOLIO_NAME VARCHAR(100), @SECTOR_NAME VARCHAR(5), @PORTFOLIO_PROPERTY_ID INT, @SHARED_PORTFOLIO BIT,
    // @FORECAST_TYPE VARCHAR(10), @FORECAST_COUNT INT
    if (userId === null || userId === 'undefined') {
        console.log("using arnab");
        request.input('USER_NAME', sql.VarChar(50), 'arnab.ganguly');
    }
    else {
        request.input('USER_NAME', sql.VarChar(50), userID);
        console.log("using " + userID);
    }
    if (portfolioName === null || portfolioName === 'undefined')
        request.input('PORTFOLIO_NAME', sql.VarChar(100), '1147');
    else
        request.input('PORTFOLIO_NAME', sql.VarChar(100), portfolioName);
    if (sector === null || sector === 'undefined')
        request.input('SECTOR_NAME', sql.VarChar(5), 'All');
    else
        request.input('SECTOR_NAME', sql.VarChar(5), sector);
    request.input('PORTFOLIO_PROPERTY_ID', sql.INT, propId);
    if (shared === null || shared === 'undefined')
        request.input('SHARED_PORTFOLIO', sql.Bit, 1);
    else
        request.input('SHARED_PORTFOLIO', sql.Bit, parseInt(shared));
    if (type === null || type === 'undefined')
        request.input('FORECAST_TYPE', sql.VarChar(10), 'year');
    else
        request.input('FORECAST_TYPE', sql.VarChar(10), type);
    if (term === null || term === 'undefined')
        request.input('FORECAST_TYPE', sql.INT, 30);
    else
        request.input('FORECAST_TYPE', sql.INT, term);
    console.log("calling SP usp_fetch_dataview_detail_data_agr with param:  userId=" + userId + ", portfolioName=" + portfolioName + ", '" + sector + "', " + propId + ", '" + shared + "', '" + type + "', " + term);
    request.execute('usp_fetch_dataview_detail_data_agr'); //OK: had to make LBL ascending (was ST2)
    request.on('recordset', function (columns) {
        // Emitted once for each recordset in a query
        var str = JSON.stringify(columns);
        console.dir(str);
    });
    request.on('row', function (row) {
        // Emitted for each row in a recordset
        //console.log("raw row: "+JSON.stringify(row));
        var loanDetail = new loanDetail_1.LoanDetail(row.loan_id_client, row.property_id_client, getDollarNumWithNull(row.original_balance), getDollarNumWithNull(row.current_balance), row.scenario_name, // + status?
        row.loan_origin_date, row.maturity_date_orig, row.loan_type, row.margin, row.interest_rate, row.reset_freq, row.next_reset_date, row.amort_type, row.amort_term_months, row.amort_term_remain, row.remaining_term, row.balloon, row.io_term, row.loss_share_pct, row.loan_risk_rating, row.client_risk_rating, row.debtYield, row.yieldDegradation, row.rs_propertyname, row.rs_streetadress, row.rs_city, row.rs_state, row.rs_zipcode, row.region, row.metcode_name, row.subname, row.sector, getPercentWithNull(row.pd_cum), getPercentWithNull(row.ls_cum), getPercentWithNull(row.el_cum), getDollarNumWithNull(row.el_value), getNumWithNull2(row.dscr), getPercentWithNull(row.current_ltv));
        console.log("row: " + JSON.stringify(loanDetail));
        loanDetails.push(loanDetail);
    });
    request.on('error', function (err) {
        // May be emitted multiple times
        console.log("ERROR: " + err);
    });
    request.on('done', function (affected) {
        // Always emitted as the last one
        console.log("LoanDerails size: " + loanDetails.length);
        console.dir("on(done):  Loans : " + JSON.stringify(loanDetails));
        response.json(loanDetails);
        console.log("Loan Details DONE");
    });
}
// Number formatting functions
function getPercentWithNull(numb) {
    if (numb == null || numb == undefined) {
        numb = '-'; //0;
        return numb;
    }
    return numb.toFixed(2) + " %";
}
function getNumWithNull(numb) {
    if (numb == null || numb == undefined) {
        numb = '-'; //0;
        return numb;
    }
    return numb.toFixed();
}
function getNumWithNull2(numb) {
    if (numb == null || numb == undefined) {
        numb = '-'; //0;
        return numb;
    }
    return numb.toFixed(2);
}
function getNumWithNull2Num(numb) {
    if (numb == null || numb == undefined) {
        numb = '-'; //0;
        return numb;
    }
    return (Math.round(((100 - numb) * 100) * 100) / 100); //numb.toFixed(2);
}
function getDollarNumWithNull(numb) {
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
sql.on('error', function (err) {
    // ... error handler
    console.log("ERROR2: " + err);
});
//# sourceMappingURL=cre-rest-server-angular.js.map