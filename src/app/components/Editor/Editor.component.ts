import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { PreviewImg } from '@app/models/general'

@Component({
  selector: 'app-editor',
  imports: [],
  template: `<p>Editor works!</p>`,
  styleUrl: './Editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  public $previewImg = input.required<PreviewImg>()
}
