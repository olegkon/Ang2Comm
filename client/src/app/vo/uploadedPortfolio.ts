export class UploadedPortfolio {

    constructor ( public portfolio_dim_id: number,
                  public portfolioName: string,
                  public upbDollars: string,
                  public portfolioUpdated: string, // creationDate
                  public sharedPortfolio: string,
                  public sharedWithOther: number,
                  public shareWithOtherUserName: string,
                  public shareWithOtherCompanyName: string,
                  public shareWithOtherUserDate: string,
                  public loanCount: number,
                  public status: string,
                  public propertyUniqueFileName: string,
                  public creditUniqueFileName: string
    ) {}

/*
     public portfolio_dim_id : number,
     public portfolioName : string,
     public sharedPortfolio : string,
     public loanCount : string,
     public upbDollars : string,
     public market_data_date : string,
     public currYrCurrQtr : string,
     public baseYear : string,
     public shared_date : string,
     public shared_user_name : string,
     public shared_company_name : string,
     public portfolioUpdated : string,
     public pricingAvailable : number,
     public shareWithOtherUserName : string,
     public shareWithOtherUserDate : string,
     public sharedWithOther : number,
     public shareWithOtherCompanyName : string,
     public sharedFromUserName : string;
*/
}
