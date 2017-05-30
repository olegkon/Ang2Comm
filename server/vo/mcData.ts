export class MCData {   // data for the MonteCarlo Grid data

    constructor (
                  public year_month : string,
                  public pd_cum : number,
                  public ls_cum : number,
                  public el_cum : number,
                  public fc_loss_cum : number) {}
}
