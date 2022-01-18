import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { NetworkService } from '../services/network.service';

export interface AppState {
  loading: boolean;
  openingNetwork: boolean;
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  constructor(private readonly networkService: NetworkService) {
    super({
      loading: false,
      openingNetwork: false,
    });
    this.fetchNetworkStatus();
  }

  loading$: Observable<boolean> = this.select((state) => state.loading);
  openingNetwork$: Observable<boolean> = this.select(
    (state) => state.openingNetwork
  );

  setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  setOpeningNetwork = this.updater((state, status: boolean) => ({
    ...state,
    openingNetwork: status,
  }));

  fetchNetworkStatus = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.networkService.getNetworkStatus().pipe(
          tap((status: boolean) => {
              console.log(status);
            this.setOpeningNetwork(status);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setNetworkStatusOpen = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.networkService.setOpenNetworkStatus().pipe(
          tap((status: string) => {
            this.fetchNetworkStatus();
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setNetworkStatusClose = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.networkService.setCloseNetworkStatus().pipe(
          tap((status: string) => {
            this.fetchNetworkStatus();
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
