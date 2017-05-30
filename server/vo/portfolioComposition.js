"use strict";
var PortfolioComposition = (function () {
    function PortfolioComposition(loan_count, original_upb, current_upb, wa_dscr, wa_ltv, wa_debtYield, wa_coupon, avg_loan_size, largest_loan, wa_rem_term, wa_rem_amort, wa_loan_age, perc_ballon, interest_only, perc_fixed, curr_y_qtr, base_year, observation_dateDB) {
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
