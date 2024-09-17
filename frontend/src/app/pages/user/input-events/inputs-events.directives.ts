import { Directive, HostListener } from '@angular/core';
import { UserComponent } from '../user.component';

@Directive({
  selector: '[appInputEvents]'
})
export class InputEventsDirective {
  constructor(private userComponent: UserComponent) {}

  @HostListener('input') onInput() {
    this.userComponent.getEvents({ type: 'K' });
  }

  @HostListener('focus') onFocus() {
    this.userComponent.getEvents({ type: 'P' });
  }

  @HostListener('click') onClick() {
    this.userComponent.getEvents({ type: 'B' });
  }
}