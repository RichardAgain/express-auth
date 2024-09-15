import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  
}
