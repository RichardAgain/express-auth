import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  primary = signal<string>('red');
  secondary = signal<string>('red');
  accent = signal<string>('red');

  text = signal<string>('black');
  background = signal<string>('white');

  textSize = signal<string>('16px');

  constructor() {
    effect(() => {
      console.log(`The COLOR is: ${this.primary()}`);
    });
  }

  resize(size: number) {
    this.textSize.set(`${size}px`);
  }
}
