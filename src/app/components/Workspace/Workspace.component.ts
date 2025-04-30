import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core'
import { PreviewImg } from '@app/models/general'
import { EditorStore } from '@app/store/editor.store'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-workspace',
  imports: [ImageComponent],
  templateUrl: './Workspace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent {
  public editorStore = inject(EditorStore)

  public itemRef = viewChild.required<ElementRef<HTMLDivElement>>('itemRef')
  public containerRef =
    viewChild.required<ElementRef<HTMLDivElement>>('containerRef')

  public $previewImg = input.required<PreviewImg>()

  public $dragging = signal(false)
  public $offset = signal<{ x: number; y: number }>({ x: 0, y: 0 })

  constructor() {
    effect(() => {
      const previewImg = this.$previewImg()
      const canvasOptions = this.editorStore.canvasOptions()

      if (previewImg || canvasOptions) {
        if (canvasOptions.height === 0) {
          const canvasHeight = (375 * previewImg.height) / previewImg.width

          this.editorStore.setCanvasOptions({
            ...canvasOptions,
            height: canvasHeight,
            orientation: canvasHeight > 375 ? 'portrait' : 'landscape',
          })
        }
      }
    })
  }

  public handleMouseMove(event: MouseEvent): void {
    if (!this.$dragging()) return

    this.editorStore.setTextOptions({
      ...this.editorStore.textOptions(),
      top: event.clientY - this.$offset().y,
      left: event.clientX - this.$offset().x,
    })
  }

  public handleMouseUp(): void {
    this.$dragging.set(false)
  }

  public handleMouseLeave(): void {
    this.$dragging.set(false)
  }

  public handleMouseDown(event: MouseEvent): void {
    this.editorStore.setSelectedLayer('text')

    this.$dragging.set(true)

    this.$offset.set({
      x: event.clientX - this.editorStore.textOptions().left,
      y: event.clientY - this.editorStore.textOptions().top,
    })
  }

  public handleTextChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value

    this.editorStore.setTextOptions({
      ...this.editorStore.textOptions(),
      text,
    })
  }

  public handleDeleteText(): void {
    this.editorStore.setTextOptions({
      ...this.editorStore.textOptions(),
      text: '',
    })
  }
}
