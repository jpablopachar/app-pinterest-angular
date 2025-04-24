import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  imports: [],
  template: `<p>LeftBar works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftBarComponent { }
