import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { LessonService } from '../services/lesson.service';

export interface Lesson {
  boxes: string[];
  description: string;
  displayname: string;
  name: string;
  objective: string;
  prerequisites: string;
}

export interface LessonState {
  lessons: Lesson[];
}

@Injectable()
export class LessonStore extends ComponentStore<LessonState> {
  constructor(private lessonService: LessonService) {
    super({
      lessons: [],
    });
    this.fetchLesson();
  }
  lesson$: Observable<Lesson[]> = this.select((state) => state.lessons);

  setLessons = this.updater((state, lessons: Lesson[]) => ({
    ...state,
    lessons,
  }));

  fetchLesson = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.lessonService.getLessons().pipe(
          tap((boxes: Lesson[]) => {
            this.setLessons(boxes);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
