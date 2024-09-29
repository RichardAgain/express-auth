import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  primary = signal<string>('red');

  textSize = signal<string>('16px');

  constructor() { 
    effect(() => {
      console.log(`The COLOR is: ${this.primary()}`);
    });
  }

  changeTheme() {
    if (this.primary() === 'red') {
      this.primary.set('blue');
      return;
    }

    this.primary.set('red');
  }

  resize(size: number) {
    this.textSize.set(`${size}px`);
  }
}
