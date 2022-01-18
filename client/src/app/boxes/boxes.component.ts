import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box, BoxesStore } from '../store/boxes.store';

@Component({
  selector: 'hth-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss'],
  providers: [BoxesStore]
})
export class BoxesComponent implements OnInit {
  listBox$!: Observable<Box[]>;
  constructor(private boxStore: BoxesStore) { }

  ngOnInit(): void {
    this.listBox$ = this.boxStore.boxes$;
  }

}
