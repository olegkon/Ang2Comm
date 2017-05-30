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
var GraphService = (function () {
    function GraphService(http) {
        this.http = http;
    }
    GraphService.prototype.getGraohByID = function (graphID) {
        return this.http.get("/graphs/" + graphID)
            .map(function (res) { return res.json(); });
    };
    GraphService.prototype.getGraphs = function (portfolioId, userID, sector, term, shared) {
        console.log("GraphService::getGraphs()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" + sector + ", term=" + term + ", shared=" + shared);
        return this.http.get("/graphs/" + portfolioId + "/" + userID + "/" + sector + "/" + term + "/" + shared)
            .map(function (res) { return res.json(); });
    };
    return GraphService;
}());
GraphService = __decorate([
    core_1.Injectable()
], GraphService);
exports.GraphService = GraphService;
