import { Component } from '@angular/core';
import { getUsernameFromLocalStorage } from '../../../utils/utils';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  getUsernameFromLocalStorage(): string {
    return getUsernameFromLocalStorage();
  }
}
