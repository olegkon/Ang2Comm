export class PortfolioComposition {   // Portfolio composition data for the Grid

    constructor ( public loan_count : number,
                  public original_upb : string, //number,
                  public current_upb : string, //number,
                  public wa_dscr : string,  //number,
                  public wa_ltv : string, //number,
                  public wa_debtYield : string, //number,
                  public wa_coupon : string, //number,
                  public avg_loan_size : string, //number,
                  public largest_loan : string, //number,
                  public wa_rem_term : string, //number,
                  public wa_rem_amort : string, //number,
                  public wa_loan_age : string, //number,
                  public perc_ballon : string, //number,
                  public interest_only : string, //number,
                  public perc_fixed : string, //number,
                  public curr_y_qtr : number,
                  public base_year : number,
                  public observation_dateDB : number ) {}

}
