import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEventsDirective } from './inputs-events.directives';
import { HeaderComponent } from '../../../shared/components/dahsboard/header/header.component';
import { FooterComponent } from '../../../shared/components/dahsboard/footer/footer.component';
import { SidebarComponent } from '../../../shared/components/dahsboard/sidebar/sidebar.component';

@NgModule({
  declarations: [InputEventsDirective],
  imports: [CommonModule, HeaderComponent, FooterComponent, SidebarComponent],
  exports: [InputEventsDirective]
})
export class InputEventsModule {}