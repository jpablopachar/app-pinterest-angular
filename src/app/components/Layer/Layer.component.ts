import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { EditorStore } from '@app/store/editor.store'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-layer',
  imports: [NgClass, ImageComponent],
  templateUrl: './Layer.component.html',
  styleUrl: './Layer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerComponent {
  public editorStore = inject(EditorStore)

  /**
   * Maneja la selección de una capa en el editor.
   *
   * Establece la capa seleccionada en el store del editor. Si la capa seleccionada es 'text',
   * agrega un nuevo elemento de texto al editor.
   *
   * @param layer - El nombre de la capa seleccionada.
   */
  public handleSelectedLayer(layer: string): void {
    this.editorStore.setSelectedLayer(layer)

    if (layer === 'text') {
      this.editorStore.addText()
    }
  }
}
