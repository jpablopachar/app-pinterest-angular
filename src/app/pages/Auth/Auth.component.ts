import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  template: `<p>Auth works!</p>`,
  styleUrl: './Auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent { }
