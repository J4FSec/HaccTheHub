import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.constant';
import { Lesson } from '../store/lesson.store';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private httpClient: HttpClient) { }

  getLessons(): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(BASE_URL+"/lessons");
  }

  getLessonByName(name: string): Observable<any> {
    return this.httpClient.get<any>(BASE_URL + "/lesson/" + name);
  }

}
