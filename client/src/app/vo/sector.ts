export class Sector {

    constructor ( public fullName:string,
                  public upb : string,  //number,
                  public upbPerc : string, //number,
                  public totalLoan : number,
                  public osSector: string
    ) {}

/*   , public pd_median : number,
     public ls_median : number,
     public el_median : number
*/
}
