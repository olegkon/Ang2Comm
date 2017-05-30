"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sector = (function () {
    function Sector(fullName, upb, //number,
        upbPerc, //number,
        totalLoan, osSector) {
        this.fullName = fullName;
        this.upb = upb;
        this.upbPerc = upbPerc;
        this.totalLoan = totalLoan;
        this.osSector = osSector;
    }
    return Sector;
}());
exports.Sector = Sector;
