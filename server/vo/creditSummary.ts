export class CreditSummary {   // Data for 2 Credit Summary grids

    constructor ( public scenario: number,  // scenario_id
                  public scenario_name : string,
                  public pd : string, //number,
                  public ls : string, //number,
                  public el : string, //number,
                  public perc: string,
                  public value : string, //number,
                  public yield_degradation : string) {}   //number,) {}
}
