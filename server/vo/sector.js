"use strict";
var Sector = (function () {
    function Sector(fullName, upb, upbPerc, totalLoan, osSector) {
        this.fullName = fullName;
        this.upb = upb;
        this.upbPerc = upbPerc;
        this.totalLoan = totalLoan;
        this.osSector = osSector;
    }
    return Sector;
}());
exports.Sector = Sector;
