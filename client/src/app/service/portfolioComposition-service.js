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
var PortfolioCompositionService = (function () {
    function PortfolioCompositionService(http) {
        this.http = http;
    }
    PortfolioCompositionService.prototype.getPortfolioCompositionByID = function (portfolioID) {
        return this.http.get("/portfolioComposition/" + portfolioID)
            .map(function (res) { return res.json(); });
    };
    PortfolioCompositionService.prototype.getPortfolioComposition = function (portfolioId, userID, sector, shared) {
        console.log("in PortfolioCompositionService::getPortfolioComposition()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" + sector + ", shared=" + shared);
        return this.http.get("/portfolioComposition/" + portfolioId + "/" + userID + "/" + sector + "/" + shared)
            .map(function (res) { return res.json(); });
    };
    return PortfolioCompositionService;
}());
PortfolioCompositionService = __decorate([
    core_1.Injectable()
], PortfolioCompositionService);
exports.PortfolioCompositionService = PortfolioCompositionService;
