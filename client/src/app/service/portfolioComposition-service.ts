import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PortfolioCompositionService {

    constructor( private http: Http) {}


 //  getPortfolioCompositionByID(portfolioID: string) : Observable<any> { // OK: not used?
 //      return this.http.get(`/api/portfolioComposition/${portfolioID}`)
 //          .map(res => res.json());
 //   }


    getPortfolioComposition(portfolioId: string, userID: string, sector: string, shared: string): Observable<any> {
    console.log("PortfolioCompositionService::getPortfolioComposition()  portfolio: " + portfolioId + ", user: " + userID +
      ", sector=" + sector + ", shared=" + shared);
    return this.http.get(`/api/portfolioComposition/${portfolioId}/${userID}/${sector}/${shared}`)
        .map(res => res.json());
    }

}
