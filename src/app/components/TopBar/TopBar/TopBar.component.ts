import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  template: `<p>TopBar works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent { }
