import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { BoxesService } from 'src/app/services/boxes.service';
import { AppStore } from 'src/app/store/app.store';
import { Box, BoxesStore } from 'src/app/store/boxes.store';

@Component({
  selector: 'hth-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input() box!: Box;
  isDisabledButtons: boolean = false;
  constructor(private boxService: BoxesService, private appStore: AppStore, private boxStore: BoxesStore) {}

  ngOnInit(): void {
      this.appStore.openingNetwork$.subscribe(value => this.isDisabledButtons = !value);
  }

  downloadBox(): void {
    this.appStore.setLoading(true);
    this.boxService
      .pullBox(this.box.name)
      .pipe(
        finalize(() => this.appStore.setLoading(false)),
      )
      .subscribe(() => this.boxStore.fetchBoxes());
  }

  startBox(): void {
    this.appStore.setLoading(true);
    this.boxService
      .startBox(this.box.name)
      .pipe(
        finalize(() => this.appStore.setLoading(false)),
      )
      .subscribe(() => this.boxStore.fetchBoxes());
  }

  deleteBox(): void {
    this.appStore.setLoading(true);
    this.boxService
      .stopBox(this.box.name)
      .pipe(
        finalize(() => this.appStore.setLoading(false))
      )
      .subscribe(() => this.boxStore.fetchBoxes());
  }
}
