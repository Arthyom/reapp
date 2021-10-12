import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-general-item',
  templateUrl: './general-item.component.html',
  styleUrls: ['./general-item.component.scss'],
})
export class GeneralItemComponent implements OnInit {

  @Input() item: any;
  @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() { }

  onItemClick() {
    this.itemClicked.emit(this.item);
  }

}
