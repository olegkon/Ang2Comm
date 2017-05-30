export class LoanDetail {   // Data for loan details popup (grids)

    constructor ( //public scenario: number,  // scenario_id
                  public loan_id_client: string,
                  public property_id_client: string,
                  public original_balance: string,
                  public current_balance: string,
                  public scenario_name: string,  // + status?
                  public loan_origin_date: string,
                  public maturity_date_orig: string,
                  public loan_type: string,
                  public margin: string,
                  public interest_rate: string,
                  public reset_freq: string,
                  public next_reset_date: string,
                  public amort_type: string,
                  public amort_term_months: string,
                  public amort_term_remain: string,
                  public remaining_term: string,
                  public balloon: string,
                  public io_term: string,
                  public loss_share_pct: string,
                  public loan_risk_rating: string,
                  public client_risk_rating: string,
                  public debtYield: string,
                  public yieldDegradation: string,

                  public rs_propertyname: string,
                  public rs_streetadress: string,
                  public rs_city: string,
                  public rs_state: string,
                  public rs_zipcode: string,
                  public region: string,
                  public metcode_name: string,
                  public subname: string,
                  public sector: string,  // property type?
                 // public current_balance: string, //number,
                  public pd_cum: string, //number,
                  public ls_cum: string, //number,
                  public el_cum: string, //number,
                  public el_value: string, //number,
                  public dscr: string, //number,
                  public current_ltv: string) //number)
    {}
}
