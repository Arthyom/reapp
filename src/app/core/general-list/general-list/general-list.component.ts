import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {

  @Input() items: any[];
  @Input() listTitle = 'List Title';
  constructor() { }

  ngOnInit() { }

}
