"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PortfolioComposition = (function () {
    function PortfolioComposition(loan_count, original_upb, //number,
        current_upb, //number,
        wa_dscr, //number,
        wa_ltv, //number,
        wa_debtYield, //number,
        wa_coupon, //number,
        avg_loan_size, //number,
        largest_loan, //number,
        wa_rem_term, //number,
        wa_rem_amort, //number,
        wa_loan_age, //number,
        perc_ballon, //number,
        interest_only, //number,
        perc_fixed, //number,
        curr_y_qtr, base_year, observation_dateDB) {
        this.loan_count = loan_count;
        this.original_upb = original_upb;
        this.current_upb = current_upb;
        this.wa_dscr = wa_dscr;
        this.wa_ltv = wa_ltv;
        this.wa_debtYield = wa_debtYield;
        this.wa_coupon = wa_coupon;
        this.avg_loan_size = avg_loan_size;
        this.largest_loan = largest_loan;
        this.wa_rem_term = wa_rem_term;
        this.wa_rem_amort = wa_rem_amort;
        this.wa_loan_age = wa_loan_age;
        this.perc_ballon = perc_ballon;
        this.interest_only = interest_only;
        this.perc_fixed = perc_fixed;
        this.curr_y_qtr = curr_y_qtr;
        this.base_year = base_year;
        this.observation_dateDB = observation_dateDB;
    }
    return PortfolioComposition;
}());
exports.PortfolioComposition = PortfolioComposition;
