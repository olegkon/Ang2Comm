import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PortfolioService {

    constructor( private http: Http) {}


   getPortfolioByID(portfolioID: string): Observable<any> {
       return this.http.get(`/api/portfolios/${portfolioID}`)
           .map(res => res.json());
   }


    getPortfolios(userId: string): Observable<any> {
        return this.http.get(`/api/portfolios/${userId}`)
            .map(res => res.json());
    }

}
