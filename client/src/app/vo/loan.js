"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Loan = (function () {
    function Loan(//public scenario: number,  // scenario_id
        rs_propertyname, rs_streetadress, rs_city, rs_state, rs_zipcode, region, metcode_name, subname, sector, current_balance, //number,
        pd_cum, //number,
        ls_cum, //number,
        el_cum, //number,
        el_value, //number,
        dscr, //number,
        current_ltv) {
        this.rs_propertyname = rs_propertyname;
        this.rs_streetadress = rs_streetadress;
        this.rs_city = rs_city;
        this.rs_state = rs_state;
        this.rs_zipcode = rs_zipcode;
        this.region = region;
        this.metcode_name = metcode_name;
        this.subname = subname;
        this.sector = sector;
        this.current_balance = current_balance;
        this.pd_cum = pd_cum;
        this.ls_cum = ls_cum;
        this.el_cum = el_cum;
        this.el_value = el_value;
        this.dscr = dscr;
        this.current_ltv = current_ltv;
    }
    return Loan;
}());
exports.Loan = Loan;
