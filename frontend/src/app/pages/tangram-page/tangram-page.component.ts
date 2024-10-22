import { Component } from '@angular/core';
import { LayoutComponent } from "../../shared/components/dahsboard/layout/layout.component";
import { TangramComponent } from "../../shared/components/tangram/tangram.component";

@Component({
  selector: 'app-tangram-page',
  standalone: true,
  imports: [LayoutComponent, TangramComponent],
  templateUrl: './tangram-page.component.html',
  styleUrl: './tangram-page.component.scss'
})
export class TangramPageComponent {

}
