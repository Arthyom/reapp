import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonButton, IonTabBar, IonTabButton } from '@ionic/angular';
import { buttonToolbarHeaders } from './models/buttonToolbarHeader';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {

  @ViewChildren(IonTabButton) tabButtons: QueryList<IonTabButton>;
  @Output() selectedTabEmitter = new EventEmitter<any>();
  buttonItems = buttonToolbarHeaders;
  constructor() { }

  ngOnInit() {
    // this.selectedTabEmitter.emit(buttonToolbarHeaders[0]);

  }

  selecTabButton(tabButton: IonTabButton, buttonInfo: any) {
    console.log('haciando algo');
    this.tabButtons.forEach((tb) => tb.selected = false);
    tabButton.selected = true;
    this.selectedTabEmitter.emit(buttonInfo);
  }

}
