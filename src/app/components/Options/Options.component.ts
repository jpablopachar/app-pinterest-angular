import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-options',
  imports: [],
  templateUrl: './Options.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent { }
