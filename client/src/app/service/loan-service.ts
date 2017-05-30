import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class LoanService {    // Top 10 loans data retrieval service

    constructor( private http: Http) {}


 //  getLoanByID(pdID: string) : Observable<any> {  //OK: not used?
 //      return this.http.get(`/loans/${pdID}`)
 //          .map(res => res.json());
 //   }


    getLoans(userID: string, portfolioId: string, sector: string, scenario: string, sort: string, shared: string): Observable<any> {
        console.log("LoanService::getLoans()  user: " + userID + ", portfolio: " + portfolioId + ", user: " + userID + ", sector: " +
          sector + ", scenario: " + scenario + ", sort: " + sort + ", shared=" + shared);
        return this.http.get(`/api/loans/${userID}/${portfolioId}/${sector}/${scenario}/${sort}/${shared}`)
            .map(res => res.json());
    }
}
