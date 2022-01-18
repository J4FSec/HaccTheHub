import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', redirectTo: 'lesson', pathMatch: 'full' },
      {
        path: "lesson",
        loadChildren: () => import('./lesson/lesson.module').then(x => x.LessonModule)
      },
      {
        path: "boxes",
        loadChildren: () => import('./boxes/boxes.module').then(x => x.BoxesModule)
      }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
