import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxesComponent } from './boxes.component';
import { BoxComponent } from './box/box.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: "",
    component: BoxesComponent
  },
];

@NgModule({
  declarations: [BoxesComponent, BoxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ]
})
export class BoxesModule { }
