import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'starwars-app';
  currentRoute = '';

  constructor(private route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url.split('/')[1];
      }
    });
  }
}
