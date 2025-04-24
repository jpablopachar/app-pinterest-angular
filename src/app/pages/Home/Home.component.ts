import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `<p>Home works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
