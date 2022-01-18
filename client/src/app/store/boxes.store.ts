import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { BoxesService } from '../services/boxes.service';
import { AppStore } from './app.store';

export interface Box {
  display_name: string;
  name: string;
  status: string;
}

export interface BoxState {
  boxes: Box[];
}

@Injectable()
export class BoxesStore extends ComponentStore<BoxState> {
  constructor(private readonly boxesService: BoxesService) {
    super({
      boxes: [],
    });
    this.fetchBoxes();
  }

  boxes$: Observable<Box[]> = this.select((state) => state.boxes);

  setBoxes = this.updater((state, boxes: Box[]) => ({
    ...state,
    boxes,
  }));

  fetchBoxes = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.boxesService.getBoxes().pipe(
          tap((boxes: Box[]) => {
            this.setBoxes(boxes);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

}
