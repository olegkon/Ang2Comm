import { Http} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ScenarioService {

    constructor( private http: Http) {}


   getScenarioByID(scenarioID: string): Observable<any> {  // OK: not used?
       return this.http.get(`/scenarios/${scenarioID}`)
           .map(res => res.json());
    }


    getScenarios(portfolioId: string, userID: string, shared: string): Observable<any> {
        console.log("ScenarioService::getScenarios()  portfolio: " + portfolioId + ", user: " + userID + ", shared: " + shared);
        return this.http.get(`/api/scenarios/${portfolioId}/${userID}/${shared}`)
            .map(res => res.json());
    }

}
