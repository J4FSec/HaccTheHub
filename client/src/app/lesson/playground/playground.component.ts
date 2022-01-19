import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'hth-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  steps: any;
  constructor(private lessonService: LessonService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.lessonService.getLessonByName(this.activateRoute.snapshot.params["id"]).subscribe(value => this.steps= value);
  }

}
