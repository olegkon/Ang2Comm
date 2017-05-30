export class GraphData {   // (Probability of Default) data for the Summary Graph

    constructor ( public scenario_id: number,
                  public scenario_name: string,
                  public pd: string,
                  public perc: string,
                  public month: number,
                  public label: number,
                  public el: string,
                  public elValue: number,
                  public ls: string
                ) {}

/*   public portfolio_dim_id : number,
     public dim_id : number,
    , public pd_median : number,
     public ls_median : number,
     public el_median : number
*/
}
