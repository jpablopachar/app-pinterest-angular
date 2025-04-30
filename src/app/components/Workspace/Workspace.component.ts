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
  styleUrl: './Workspace.component.css',
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

  /**
   * Maneja el evento de movimiento del mouse durante una operación de arrastre.
   *
   * Si hay un elemento en proceso de arrastre (`$dragging` es verdadero), actualiza las opciones de texto
   * en el `editorStore` ajustando las coordenadas `top` y `left` según la posición actual del mouse,
   * compensando el desplazamiento inicial (`$offset`).
   *
   * @param event El evento de movimiento del mouse (`MouseEvent`).
   */
  public handleMouseMove(event: MouseEvent): void {
    if (!this.$dragging()) return

    this.editorStore.setTextOptions({
      ...this.editorStore.textOptions(),
      top: event.clientY - this.$offset().y,
      left: event.clientX - this.$offset().x,
    })
  }

  /**
   * Maneja el evento de liberación del botón del mouse.
   *
   * Este método se llama cuando el usuario suelta el botón del mouse,
   * y se encarga de actualizar el estado de arrastre a falso,
   * indicando que la operación de arrastre ha finalizado.
   */
  public handleMouseUp(): void {
    this.$dragging.set(false)
  }

  /**
   * Maneja el evento cuando el puntero del mouse sale del área del componente.
   *
   * Este método se utiliza para restablecer el estado de arrastre (`$dragging`) a `false`
   * cuando el usuario deja de interactuar con el área correspondiente, asegurando que
   * no se mantenga el estado de arrastre activo accidentalmente.
   */
  public handleMouseLeave(): void {
    this.$dragging.set(false)
  }

  /**
   * Maneja el evento de presionar el botón del mouse sobre el área de trabajo.
   *
   * - Selecciona la capa de texto en el editor.
   * - Activa el estado de arrastre.
   * - Calcula y establece el desplazamiento inicial entre la posición del mouse y la posición actual del texto.
   *
   * @param event El evento MouseEvent que contiene la información de la posición del cursor.
   */
  public handleMouseDown(event: MouseEvent): void {
    this.editorStore.setSelectedLayer('text')

    this.$dragging.set(true)

    this.$offset.set({
      x: event.clientX - this.editorStore.textOptions().left,
      y: event.clientY - this.editorStore.textOptions().top,
    })
  }

  /**
   * Maneja el evento de cambio de texto en un campo de entrada.
   *
   * Extrae el valor actual del campo de texto desde el evento recibido y actualiza las opciones de texto
   * en el almacén del editor (`editorStore`) manteniendo las opciones previas y reemplazando solo el texto.
   *
   * @param event El evento de cambio generado por el campo de entrada de texto.
   */
  public handleTextChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value

    this.editorStore.setTextOptions({
      ...this.editorStore.textOptions(),
      text,
    })
  }

  /**
   * Elimina el texto actual del editor estableciendo la propiedad `text` como una cadena vacía
   * en las opciones de texto del editor.
   *
   * @remarks
   * Este método actualiza el estado del editor para reflejar la eliminación del texto,
   * manteniendo las demás opciones de texto sin cambios.
   */
  public handleDeleteText(): void {
    this.editorStore.setTextOptions({
      ...this.editorStore.textOptions(),
      text: '',
    })
  }
}
