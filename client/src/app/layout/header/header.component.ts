import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'hth-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  networkStatus: boolean = false;
  constructor(private appStore: AppStore) {}

  ngOnInit(): void {
    this.appStore.openingNetwork$.subscribe(
      (status) => (this.networkStatus = status)
    );
  }

  toggleStatus(value: MatSlideToggleChange): void {
    if (value.checked) {
      this.appStore.setNetworkStatusOpen();
    } else {
      this.appStore.setNetworkStatusClose();
    }
  }
}
