import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GUIService } from '../../services/common/GUI/gui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-item',
  templateUrl: './general-item.component.html',
  styleUrls: ['./general-item.component.scss'],
})
export class GeneralItemComponent implements OnInit {

  @Input() selectable = false;
  @Input() item: any;
  @Input() transType: string;
  @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemPressed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
   }

  onItemClick(el) {
    this.itemClicked.emit(this.item);
    if (!this.selectable){
      this.router.navigate(['transactions', this.transType],  { state: { info: this.item } });
    }
    else{
      this.press({}, el);
    }
  }

  getBadgeColor(){
    switch (this.item.clasificacion) {
      case 'Ahorros': return 'primary';
      case 'Prestamos': return 'warning';
      case 'Abonos': return 'danger';
      default: return 'primary';
    }
  }

  press(evento, el) {

    if (this.selectable) {

      document.querySelectorAll('ion-item').forEach((item) => {
        item.className = item.className.replace('select', '');
        if(item.color === 'medium'){
          item.color = 'light';
        }
      });

      this.itemPressed.emit(this.item);
      el.color= 'medium';
      el.lines= 'none';
    }
  }

  movementsOf(){
    this.router.navigateByUrl('movimientos', { state: { info: this.item } });
  }

}
