import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  ping = () => {
    axios.get('/api/ping')
    .then((res) => {
      console.log(res.data)
    })
  }
}
