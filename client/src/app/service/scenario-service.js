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
var ScenarioService = (function () {
    function ScenarioService(http) {
        this.http = http;
    }
    ScenarioService.prototype.getScenarioByID = function (scenarioID) {
        return this.http.get("/scenarios/" + scenarioID)
            .map(function (res) { return res.json(); });
    };
    ScenarioService.prototype.getScenarios = function (portfolioId, userID, shared) {
        console.log("in ScenarioService::getScenarios()  portfolio: " + portfolioId + ", user: " + userID + ", shared: " + shared);
        return this.http.get("/scenarios/" + portfolioId + "/" + userID + "/" + shared)
            .map(function (res) { return res.json(); });
    };
    return ScenarioService;
}());
ScenarioService = __decorate([
    core_1.Injectable()
], ScenarioService);
exports.ScenarioService = ScenarioService;
