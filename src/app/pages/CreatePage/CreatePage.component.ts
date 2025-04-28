import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-create-page',
  imports: [],
  template: `<p>CreatePage works!</p>`,
  styleUrl: './CreatePage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent { }
