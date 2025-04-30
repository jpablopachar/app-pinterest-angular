import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { PreviewImg } from '@app/models/general'
import { LayerComponent } from '../Layer/Layer.component'
import { OptionsComponent } from '../Options/Options.component'
import { WorkspaceComponent } from '../Workspace/Workspace.component'

@Component({
  selector: 'app-editor',
  imports: [LayerComponent, WorkspaceComponent, OptionsComponent],
  template: `
    <app-workspace [$previewImg]="$previewImg()" />
    <app-options [$previewImg]="$previewImg()" />
    <app-layer />
  `,
  styleUrl: './Editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  public $previewImg = input.required<PreviewImg>()
}
