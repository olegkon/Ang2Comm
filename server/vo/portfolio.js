"use strict";
var Portfolio = (function () {
    function Portfolio(portfolio_dim_id, portfolioName, upbDollars, portfolioUpdated, sharedPortfolio, sharedWithOther, shareWithOtherUserName, shareWithOtherCompanyName, shareWithOtherUserDate) {
        this.portfolio_dim_id = portfolio_dim_id;
        this.portfolioName = portfolioName;
        this.upbDollars = upbDollars;
        this.portfolioUpdated = portfolioUpdated;
        this.sharedPortfolio = sharedPortfolio;
        this.sharedWithOther = sharedWithOther;
        this.shareWithOtherUserName = shareWithOtherUserName;
        this.shareWithOtherCompanyName = shareWithOtherCompanyName;
        this.shareWithOtherUserDate = shareWithOtherUserDate;
    }
    return Portfolio;
}());
exports.Portfolio = Portfolio;
