import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/store/lesson.store';

@Component({
  selector: 'hth-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss']
})
export class LessonItemComponent implements OnInit {
@Input() lesson!: Lesson;
  constructor() { }

  ngOnInit(): void {
  }

}
