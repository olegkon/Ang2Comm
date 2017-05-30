"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphData = (function () {
    function GraphData(scenario_id, scenario_name, pd, perc, month, label, el, elValue, ls) {
        this.scenario_id = scenario_id;
        this.scenario_name = scenario_name;
        this.pd = pd;
        this.perc = perc;
        this.month = month;
        this.label = label;
        this.el = el;
        this.elValue = elValue;
        this.ls = ls;
    }
    return GraphData;
}());
exports.GraphData = GraphData;
