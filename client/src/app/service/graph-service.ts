import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class GraphService {    // Probability of Default Graph data retrieval service

    constructor( private http: Http) {}

 //  getGraohByID(graphID: string): Observable<any> {  // OK: not used?
 //      return this.http.get(`/graphs/${graphID}`)
 //          .map(res => res.json());
 //   }


    getGraphs(portfolioId: string, userID: string, sector: string, term: string, shared: string): Observable<any> {
        console.log("GraphService::getGraphs()  portfolio: " + portfolioId + ", user: " + userID + ", sector=" + sector +
          ", term=" + term + ", shared=" + shared);
        return this.http.get(`/api/graphs/${portfolioId}/${userID}/${sector}/${term}/${shared}`)
            .map(res => res.json());
    }

}
