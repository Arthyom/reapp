import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer, Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { take, delay, repeatWhen } from 'rxjs/operators';
import { GeneralResponse } from '../../models/responses/generalResponse';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { GlobalService } from '../../services/common/global/global.service';
import { GUIService } from '../../services/common/GUI/gui.service';




@Component({
  selector: 'app-general-token',
  templateUrl: './general-token.component.html',
  styleUrls: ['./general-token.component.scss'],
})
export class GeneralTokenComponent implements OnInit {

  @Input() response: GeneralResponse;
  @Output() tokenEmiter: EventEmitter<void> = new EventEmitter<void>();

  id = uuidv4();
  totalWait = 15000;
  wait = this.totalWait;
  active = true;
  private delay = 1300;
  private timer$: Observable<number>;
  private restart: Subject<void> = new Subject<void>();




  constructor(
    private clipBoard: Clipboard,
    private gui: GUIService
  ) {
    this.active = false;
    this.timer$ = timer(0, this.delay);

    this.timer$
      .pipe(
        take((this.wait / 1000)),
        repeatWhen(() => this.restart)
      )
      .subscribe((data) => {
        this.wait -= 1000;

        if( this.wait === 0 ){
          this.active = true;
        }
      });
  }

  ngOnInit() {

  }

  createNewToken() {
    this.active = false;
    this.wait = this.totalWait;
    this.restart.next();
    this.tokenEmiter.emit();
  }

  copiarToken(){
    this.clipBoard.copy(this.response.mensaje);
  }

  cerrar(){
    this.gui.navigateTo('/login');
  }

}
