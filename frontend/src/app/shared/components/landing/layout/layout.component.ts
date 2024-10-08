import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { text } from 'stream/consumers';
import { TextComponent } from '../../text/text.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { TitleComponent } from "../../title/title.component";
import { FooterComponent } from "../../dahsboard/footer/footer.component";
import { SubTitleComponent } from "../../sub-title/sub-title.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, TextComponent, TitleComponent, FooterComponent, SubTitleComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  theme = inject(ThemeService)

  // constructor () {
  //   this.theme.changeTheme()
  // }
}
