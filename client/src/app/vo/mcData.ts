export class MCData {   // data for the MonteCarlo Grid data

    constructor (
                  public year_month: string,
                  public pd_cum: number,
                  public ls_cum: string,
                  public el_cum: string,
                  public fc_loss_cum: string) {}
}
