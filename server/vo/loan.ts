export class Loan {   // Data for top 10 loans grid

    constructor ( //public scenario: number,  // scenario_id
                  public rs_propertyname: string,
                  public rs_streetadress: string,
                  public rs_city: string,
                  public rs_state: string,
                  public rs_zipcode: string,
                  public region: string,
                  public metcode_name: string,
                  public subname: string,
                  public sector: string,
                  public current_balance: string, //number,
                  public pd_cum: string, //number,
                  public ls_cum: string, //number,
                  public el_cum: string, //number,
                  public el_value: string, //number,
                  public dscr: string, //number,
                  public current_ltv: string,
                  public portfolio_property_dim_id: string  ) //number)
    {}
}
