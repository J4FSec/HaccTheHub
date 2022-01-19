import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson.component';
import { RouterModule, Routes } from '@angular/router';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { MatCardModule } from '@angular/material/card';
import { PlaygroundComponent } from './playground/playground.component';
import { MatDividerModule } from '@angular/material/divider';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownPipe } from '../markdown.pipe';

const routes: Routes = [
  {
    path: '',
    component: LessonComponent,
  },
  {
    path: ':id',
    component: PlaygroundComponent,
  },
];

@NgModule({
  declarations: [LessonComponent, LessonItemComponent, PlaygroundComponent, MarkdownPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule,
    CdkStepperModule,
    MatStepperModule,
    MatIconModule
  ],
})
export class LessonModule {}
