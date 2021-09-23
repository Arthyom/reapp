import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonButton, IonTabBar, IonTabButton } from '@ionic/angular';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {

  @ViewChildren(IonTabButton) tabButtons: QueryList<IonTabButton>;
  @Output() selectedTabEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit() { }

  selecTabButton(tabButton: IonTabButton, index: number) {
    this.tabButtons.forEach((tb) => tb.selected = false);
    tabButton.selected = true;
    this.selectedTabEmitter.emit(index - 1);
  }

}
