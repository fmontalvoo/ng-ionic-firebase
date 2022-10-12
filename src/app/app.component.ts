import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user$ = this.as.authState$
    .pipe(
      filter(state => !!state)
    );

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private router: Router,
    private as: AuthService
  ) { }

  logout(): void {
    this.as.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(console.error);
  }
}
