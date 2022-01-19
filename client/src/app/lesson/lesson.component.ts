import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson, LessonStore } from '../store/lesson.store';

@Component({
  selector: 'hth-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  providers: [LessonStore]
})
export class LessonComponent implements OnInit {

  listLesson$!: Observable<Lesson[]>;
  constructor(private lessonStore: LessonStore) { }

  ngOnInit(): void {
    this.listLesson$ = this.lessonStore.lesson$;
  }

}
