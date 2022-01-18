import { Component } from '@angular/core';
import { BoxesService } from './services/boxes.service';
import { AppStore } from './store/app.store';

@Component({
  selector: 'hth-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppStore]
})
export class AppComponent {
  constructor(private readonly appStore: AppStore) {
  }
  loading$ = this.appStore.loading$;

}
