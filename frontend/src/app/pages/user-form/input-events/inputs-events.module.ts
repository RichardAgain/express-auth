import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEventsDirective } from './inputs-events.directives';

@NgModule({
  declarations: [InputEventsDirective],
  imports: [CommonModule],
  exports: [InputEventsDirective]
})
export class InputEventsModule {}