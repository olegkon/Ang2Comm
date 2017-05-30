"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreditSummary = (function () {
    function CreditSummary(scenario, // scenario_id
        scenario_name, pd, //number,
        ls, //number,
        el, //number,
        perc, value, //number,
        yield_degradation) {
        this.scenario = scenario;
        this.scenario_name = scenario_name;
        this.pd = pd;
        this.ls = ls;
        this.el = el;
        this.perc = perc;
        this.value = value;
        this.yield_degradation = yield_degradation;
    } //number,) {}
    return CreditSummary;
}());
exports.CreditSummary = CreditSummary;
