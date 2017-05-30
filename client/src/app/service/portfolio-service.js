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
var PortfolioService = (function () {
    function PortfolioService(http) {
        this.http = http;
    }
    PortfolioService.prototype.getPortfolioByID = function (portfolioID) {
        return this.http.get("/portfolios/" + portfolioID)
            .map(function (res) { return res.json(); });
    };
    PortfolioService.prototype.getPortfolios = function (userId) {
        return this.http.get("/portfolios/" + userId)
            .map(function (res) { return res.json(); });
    };
    return PortfolioService;
}());
PortfolioService = __decorate([
    core_1.Injectable()
], PortfolioService);
exports.PortfolioService = PortfolioService;
