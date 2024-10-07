import { Directive, HostListener } from '@angular/core';
import { UserFormComponent } from '../user-form.component';

@Directive({
  selector: '[appInputEvents]'
})
export class InputEventsDirective {
  constructor(private userComponent: UserFormComponent) {}

  @HostListener('input') onInput() {
    this.userComponent.getEvents({ type: 'K', times: 1 });
  }

  @HostListener('focus') onFocus() {
    this.userComponent.getEvents({ type: 'P', times: 1 });
  }

  @HostListener('click') onClick() {
    this.userComponent.getEvents({ type: 'B', times: 1 });
  }
}