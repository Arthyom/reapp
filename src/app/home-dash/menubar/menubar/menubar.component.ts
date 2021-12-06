import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonButton, IonTabBar, IonTabButton } from '@ionic/angular';
import { buttonToolbarHeaders } from './models/buttonToolbarHeader';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit, AfterViewInit {

  @ViewChildren(IonTabButton) tabButtons: QueryList<IonTabButton>;
  @Output() selectedTabEmitter = new EventEmitter<any>();

  @Input() lens: number[] = [];

  buttonItems = buttonToolbarHeaders;
  constructor() { }

  ngOnInit() {
  }

  selecTabButton(tabButton: IonTabButton, buttonInfo: any) {
    this.tabButtons.forEach((tb) => tb.selected = false);
    tabButton.selected = true;
    this.selectedTabEmitter.emit(buttonInfo);
  }

  ngAfterViewInit() {
    this.selecTabButton(this.tabButtons.first, buttonToolbarHeaders[0]);
  }

}
