import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CreditSummaryService {    // Credit Summary Grids data retrieval service

    constructor( private http: Http) {}

 //  getCreditSummaryByID(pdID: string) : Observable<any> {  //OK: not used?
 //      return this.http.get(`/pds/${pdID}`)
 //          .map(res => res.json());
 //   }


    getCreditSummary(portfolioId: string, userID: string, sector: string, term: string, shared: string): Observable<any> {
        console.log("CreditSummaryService::getCreditSummary()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" +
          sector + ", term=" + term + ", shared=" + shared);
        return this.http.get(`/api/summary/${portfolioId}/${userID}/${sector}/${term}/${shared}`)
            .map(res => res.json());
    }


    get1YSummary(portfolioId: string, userID: string, sector: string, term: string, shared: string): Observable<any> {
        console.log("CreditSummaryService::get1YSummary()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" +
          sector + ", term=" + term + ", shared=" + shared);
        return this.http.get(`/api/summary1y/${portfolioId}/${userID}/${sector}/${term}/${shared}`)
            .map(res => res.json());
    }


    getMonteCarloData(portfolioId: string, userID: string, sector: string, scenarioName: string, interval: string, shared: string): Observable<any> {
        console.log("CreditSummaryService::getMonteCarlo()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" +
          sector + ", scenarioName: " + scenarioName + ", interval=" + interval + ", shared=" + shared);
        return this.http.get(`/api/mc/${portfolioId}/${userID}/${sector}/${scenarioName}/${interval}/${shared}`)
            .map(res => res.json());
    }
}
