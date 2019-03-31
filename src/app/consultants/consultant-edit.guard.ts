import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ConsultantEditComponent } from './consultant-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ConsultantEditGuard implements CanDeactivate<ConsultantEditComponent> {
  canDeactivate(component: ConsultantEditComponent): 
  Observable<boolean> | Promise<boolean> | boolean {
    if (component.consultantForm.dirty) {
      return confirm(`Leave page and discard changes?`);
    }
    return true;
  }
}
