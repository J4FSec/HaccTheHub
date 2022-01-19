import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private readonly httpClient: HttpClient) { }

  getNetworkStatus(): Observable<boolean> {
    return this.httpClient.get<boolean>(BASE_URL + '/network');
  }

  setOpenNetworkStatus(): Observable<string> {
    return this.httpClient.post<string>(BASE_URL + '/network', {});
  }

  setCloseNetworkStatus(): Observable<string> {
    return this.httpClient.delete<string>(BASE_URL + '/network', {});
  }
}
