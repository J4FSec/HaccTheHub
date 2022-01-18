import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../app.constant";
import { Box } from "../store/boxes.store";

@Injectable({
    providedIn: 'root'
})
export class BoxesService {
    constructor(private readonly httpClient: HttpClient) {}

    getBoxes(): Observable<Box[]> {
        return this.httpClient.get<Box[]>(BASE_URL+ "/boxes/status");
    }

    pullBox(name: string): Observable<string> {
        return this.httpClient.post<string>(BASE_URL + "/images/pull/" + name, {});
    }

    stopBox(name: string): Observable<string> {
        return this.httpClient.delete<string>(BASE_URL + "/container/" + name, {});
    }

    startBox(name: string): Observable<string> {
        return this.httpClient.get<string>(BASE_URL + "/container/" + name);
    }
}