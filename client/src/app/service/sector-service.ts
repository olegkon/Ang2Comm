import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class SectorService {

    constructor( private http: Http) {}


 //  getSectorByID(sectorID: string): Observable<any> {  // OK: not used?
 //      return this.http.get(`/sectors/${sectorID}`)
 //          .map(res => res.json());
 //   }


    getSectors(portfolioId: string, userID: string, scenario: string, shared: string): Observable<any> {
        return this.http.get(`/api/sectors/${portfolioId}/${userID}/${scenario}/${shared}`)
            .map(res => res.json());
    }

}
