"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var CreditSummaryService = (function () {
    function CreditSummaryService(http) {
        this.http = http;
    }
    //  getCreditSummaryByID(pdID: string) : Observable<any> {  //OK: not used?
    //      return this.http.get(`/pds/${pdID}`)
    //          .map(res => res.json());
    //   }
    CreditSummaryService.prototype.getCreditSummary = function (portfolioId, userID, sector, term, shared) {
        console.log("CreditSummaryService::getCreditSummary()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" + sector + ", term=" + term + ", shared=" + shared);
        return this.http.get("/summary/" + portfolioId + "/" + userID + "/" + sector + "/" + term + "/" + shared)
            .map(function (res) { return res.json(); });
    };
    CreditSummaryService.prototype.get1YSummary = function (portfolioId, userID, sector, term, shared) {
        console.log("CreditSummaryService::get1YSummary()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" + sector + ", term=" + term + ", shared=" + shared);
        return this.http.get("/summary1y/" + portfolioId + "/" + userID + "/" + sector + "/" + term + "/" + shared)
            .map(function (res) { return res.json(); });
    };
    CreditSummaryService.prototype.getMonteCarloData = function (portfolioId, userID, sector, scenarioName, interval, shared) {
        console.log("CreditSummaryService::getMonteCarlo()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" + sector + ", scenarioName: " + scenarioName + ", interval=" + interval + ", shared=" + shared);
        return this.http.get("/mc/" + portfolioId + "/" + userID + "/" + sector + "/" + scenarioName + "/" + interval + "/" + shared)
            .map(function (res) { return res.json(); });
    };
    return CreditSummaryService;
}());
CreditSummaryService = __decorate([
    core_1.Injectable()
], CreditSummaryService);
exports.CreditSummaryService = CreditSummaryService;
