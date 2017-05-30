"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MCData = (function () {
    function MCData(year_month, pd_cum, ls_cum, el_cum, fc_loss_cum) {
        this.year_month = year_month;
        this.pd_cum = pd_cum;
        this.ls_cum = ls_cum;
        this.el_cum = el_cum;
        this.fc_loss_cum = fc_loss_cum;
    }
    return MCData;
}());
exports.MCData = MCData;
