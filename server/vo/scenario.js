"use strict";
var Scenario = (function () {
    function Scenario(scenario_name, OS_scenario_id) {
        this.scenario_name = scenario_name;
        this.OS_scenario_id = OS_scenario_id;
    }
    return Scenario;
}());
exports.Scenario = Scenario;
