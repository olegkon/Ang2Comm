"use strict";
var PD = (function () {
    function PD(scenario_id, scenario_name, pd, perc, month, label) {
        this.scenario_id = scenario_id;
        this.scenario_name = scenario_name;
        this.pd = pd;
        this.perc = perc;
        this.month = month;
        this.label = label;
    }
    return PD;
}());
exports.PD = PD;
