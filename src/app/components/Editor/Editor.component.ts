import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { PreviewImg } from '@app/models/general'
import { LayerComponent } from '../Layer/Layer.component'
import { OptionsComponent } from '../Options/Options.component'
import { WorkspaceComponent } from '../Workspace/Workspace.component'

@Component({
  selector: 'app-editor',
  imports: [LayerComponent, WorkspaceComponent, OptionsComponent],
  template: `
    <div class="editor">
      <app-layer />
      <app-workspace [$previewImg]="$previewImg()" />
      <app-options [$previewImg]="$previewImg()" />
    </div>
  `,
  styles: [
    `
      .editor {
        display: flex;
        gap: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  public $previewImg = input.required<PreviewImg>()
}
