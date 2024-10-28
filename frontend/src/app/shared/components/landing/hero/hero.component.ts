import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { ButtonOutlineComponent } from '../../buttons/button-outline/button-outline.component';
import { ThemeService } from '../../../services/theme.service';
import { TextComponent } from "../../text/text.component";
import { TitleComponent } from "../../title/title.component";
import { TangramComponent } from "../../tangram/tangram.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonPrimaryComponent, ButtonOutlineComponent, TextComponent, TitleComponent, TangramComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  theme = inject(ThemeService)
}
